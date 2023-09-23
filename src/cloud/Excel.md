---
title: EasyExcel
---

## 1、简介

EasyExcel是一个阿里开源的基于Java的、快速、简洁、解决大文件内存溢出的Excel处理工具。
他能让你在不用考虑性能、内存的等因素的情况下，快速完成Excel的读、写等功能。
EasyExcel基于POI进行封装优化，降低内存使用，再大的excel也不会出现内存溢出，让使用更加简单方便。

官网： <https://easyexcel.opensource.alibaba.com/>
github： <https://github.com/alibaba/easyexcel>

## 2、读取Excel

### EasyExcel需引入如下依赖

``` xml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>easyexcel</artifactId>
    <version>3.1.0</version>
</dependency>
```

示例中还需引入其他依赖：

``` xml
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.8</version>
</dependency>

<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>fastjson</artifactId>
    <version>1.2.60</version>
</dependency>
```

示例Excel表格demo1.xlsx如下：

![img](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/202210191702232.png)

### 读取Excel数据的对象

``` java
@Data
@HeadRowHeight(20)
@ColumnWidth(20)
public class DemoData {
    @ExcelProperty("字符串标题")
    private String string;
    @ExcelProperty("日期标题")
    private Date date;
    @ExcelProperty("数字标题")
    private Double doubleData;
    @ExcelIgnore
    private String ignore;
}
```

> 注解：
> ExcelProperty：指定当前字段对应excel中的那一列，可以根据名字或者Index去匹配，不写，默认按顺序匹配，可以根据converter指定字段转换器；
> ExcelIgnore：默认所有字段都会和excel去匹配，加了这个注解会忽略该字段；
> DateTimeFormat：日期转换，用String去接收excel日期格式的数据会调用这个注解；
> NumberFormat：数字转换，用String去接收excel数字格式的数据会调用这个注解；
> ExcelIgnoreUnannotated：默认不加ExcelProperty的注解的都会参与读写，加了不会参与；
> ColumnWidth：设置列宽；
> ContentRowHeight：设置行高；
> HeadRowHeight：设置头高。

```java
@Slf4j
public class EasyExcelReadTest {

    @Test
    public void syncRead() {
        String fileName = "demo1.xlsx";
        // 这里需要指定读用哪个class去读，然后读取第一个sheet 同步读取会自动finish
        List<DemoData> list = EasyExcel.read(fileName).head(DemoData.class).sheet().doReadSync();
        for (DemoData data : list) {
            log.info("读取到数据:{}", JSON.toJSONString(data));
        }

        // 这里也可以不指定class，返回一个list，然后读取第一个sheet 同步读取会自动finish
        List<Map<Integer, String>> listMap = EasyExcel.read(fileName).sheet().doReadSync();
        for (Map<Integer, String> data : listMap) {
            // 返回每条数据的键值对 表示所在的列 和所在列的值
            log.info("读取到数据:{}", JSON.toJSONString(data));
        }
    }

    /**
     * 最简单的读
     */
    @Test
    public void simpleRead() {
        // 有个很重要的点 DemoDataListener 不能被spring管理，要每次读取excel都要new,然后里面用到spring可以构造方法传进去
        // 写法1：
        String fileName = "demo1.xlsx";
        // 这里 需要指定读用哪个class去读，然后读取第一个sheet，文件流会自动关闭
        EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).sheet().doRead();

        // 写法2：
        try (ExcelReader excelReader = EasyExcel.read(fileName, DemoData.class, new DemoDataListener()).build()) {
            // 构建一个sheet 这里可以指定名字或者no
            ReadSheet readSheet = EasyExcel.readSheet(0).build();
            // 读取一个sheet
            excelReader.read(readSheet);
        }
    }

}

```

### 读监听器

``` java
/**
 * 模板的读取类
 *
 * 有个很重要的点 DemoDataListener 不能被spring管理，要每次读取excel都要new,然后里面用到spring可以构造方法传进去
 */
@Slf4j
public class DemoDataListener extends AnalysisEventListener<DemoData> {
    /**
     * 每隔200条存储数据库，然后清理list，方便内存回收
     */
    private static final int BATCH_COUNT = 200;
    private List<DemoData> list = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);
    private DemoService demoService;

    public DemoDataListener() {
        // 这里是demo，所以随便new一个。实际使用如果到了spring,请使用下面的有参构造函数
        demoService = new DemoService();
    }

    public DemoDataListener(DemoService demoService) {
        this.demoService = demoService;
    }

    /**
     * 这个每一条数据解析都会来调用
     *
     * @param data
     * @param context
     */
    @Override
    public void invoke(DemoData data, AnalysisContext context) {
        log.info("解析到一条数据:{}", JSON.toJSONString(data));
        list.add(data);
        // 达到BATCH_COUNT了，需要去存储一次数据库，防止数据几万条数据在内存，容易OOM
        if (list.size() >= BATCH_COUNT) {
            saveData();
            // 存储完成清理 list
            list = ListUtils.newArrayListWithExpectedSize(BATCH_COUNT);
        }
    }

    /**
     * 所有数据解析完成了都会来调用
     *
     * @param context
     */
    @Override
    public void doAfterAllAnalysed(AnalysisContext context) {
        // 这里也要保存数据，确保最后遗留的数据也存储到数据库
        saveData();
        log.info("所有数据解析完成！");
    }

    /**
     * 加上存储数据库
     */
    private void saveData() {
        log.info("{}条数据，开始存储数据库！", list.size());
        demoService.save(list);
        log.info("存储数据库成功！");
    }
}

```

### 业务层数据处理

``` java
public class DemoService {
    public void save(List<DemoData> list) {
        // 这里写入数据库
    }
}
```

## 3、写入Excel

```java
@Slf4j
public class EasyExcelWriteTest {

    @Test
    public void writeExcel() {
        // 写法1 JDK8+
        // since: 3.0.0-beta1
        String fileName = "demo" + System.currentTimeMillis() + ".xlsx";
        // 这里 需要指定写用哪个class去写，然后写到第一个sheet，名字为模板 然后文件流会自动关闭
        EasyExcel.write(fileName, DemoData.class)
                .sheet("模板")
                .doWrite(() -> {
                    // 分页查询数据
                    return data();
                });

        // 写法2
        fileName = "demo" + System.currentTimeMillis() + ".xlsx";
        // 这里 需要指定写用哪个class去写，然后写到第一个sheet，名字为模板 然后文件流会自动关闭
        EasyExcel.write(fileName, DemoData.class).sheet("模板").doWrite(data());

    }

    private List<DemoData> data() {
        List<DemoData> list = new ArrayList<DemoData>();
        for (int i = 0; i < 10; i++) {
            DemoData data = new DemoData();
            data.setString("字符串" + i);
            data.setDate(new Date());
            data.setDoubleData(0.56);
            list.add(data);
        }
        return list;
    }
}

```

## 4、Web上传下载

```java
@Controller
public class UploadDownController {

    @Autowired
    private DemoService demoService;

    /**
     * 文件下载（失败了会返回一个有部分数据的Excel）
     */
    @GetMapping("download")
    public void download(HttpServletResponse response) throws IOException {
        // 这里注意 有同学反应使用swagger 会导致各种问题，请直接用浏览器或者用postman
        response.setContentType("application/vnd.ms-excel");
        response.setCharacterEncoding("utf-8");
        // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
        String fileName = URLEncoder.encode("测试", "UTF-8").replaceAll("\\+", "%20");
        response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
        EasyExcel.write(response.getOutputStream(), DemoData.class).sheet("模板").doWrite(data());
    }

    /**
     * 文件下载并且失败的时候返回json（默认失败了会返回一个有部分数据的Excel）
     *
     * @since 2.1.1
     */
    @GetMapping("api/download")
    public void downloadApi(HttpServletResponse response) throws IOException {
        try {
            response.setContentType("application/vnd.ms-excel");
            response.setCharacterEncoding("utf-8");
            // 这里URLEncoder.encode可以防止中文乱码 当然和easyexcel没有关系
            String fileName = URLEncoder.encode("测试", "UTF-8").replaceAll("\\+", "%20");
            response.setHeader("Content-disposition", "attachment;filename*=utf-8''" + fileName + ".xlsx");
            // 这里需要设置不关闭流
            EasyExcel.write(response.getOutputStream(), DemoData.class).autoCloseStream(Boolean.FALSE).sheet("模板")
                .doWrite(data());
        } catch (Exception e) {
            // 重置response
            response.reset();
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            Map<String, String> map = new HashMap<String, String>();
            map.put("code", "500");
            map.put("message", "下载文件失败" + e.getMessage());
            response.getWriter().println(JSON.toJSONString(map));
        }
    }

    /**
     * 文件上传
     */
    @PostMapping("upload")
    @ResponseBody
    public String upload(MultipartFile file) throws IOException {
        EasyExcel.read(file.getInputStream(), DemoData.class, new DemoDataListener(demoService)).sheet().doRead();
        return "success";
    }

    private List<DemoData> data() {
        List<DemoData> list = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            DemoData data = new DemoData();
            data.setString("字符串" + 0);
            data.setDate(new Date());
            data.setDoubleData(0.56);
            list.add(data);
        }
        return list;
    }
}
```

Excel上传时，获取Excel数据，我们也可以封装个工具类ExcelUtils:

```java
@Slf4j
public class ExcelUtils {

    public static <T> List<T> getExcelModelData(final InputStream inputStream, Class<T> clazz) {
        if (null == inputStream) {
            throw new NullPointerException("the inputStream is null!");
        }
        ExcelReaderBuilder result = EasyExcel.read(inputStream, clazz, null);
        ExcelReaderSheetBuilder sheet1 = result.sheet();
        List<T> resultData = sheet1.doReadSync();
        return resultData;
    }
}

```

上传的代码也可改为如下：

``` java
@PostMapping("upload")
@ResponseBody
public String upload(MultipartFile file) throws IOException {
    List<DemoData> excelModelData = ExcelUtils.getExcelModelData(file.getInputStream(), DemoData.class);
    demoService.save(excelModelData);
    return "success";
}

```

API参考：
[EasyExcel API](https://easyexcel.opensource.alibaba.com/docs/current/api/)

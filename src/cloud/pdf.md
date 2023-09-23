---
title: PDF导出
---

## POM依赖

``` xml
<!-- PDF导出-->
<!-- https://mvnrepository.com/artifact/com.itextpdf/itextpdf -->
<dependency>
    <groupId>com.itextpdf</groupId>
    <artifactId>itextpdf</artifactId>
    <version>5.5.13</version>
</dependency>
```

## 核心代码

``` java
package com.qf.resume.controller;

import com.itextpdf.text.pdf.AcroFields;
import com.itextpdf.text.pdf.BaseFont;
import com.itextpdf.text.pdf.PdfReader;
import com.itextpdf.text.pdf.PdfStamper;
import com.qf.resume.entity.ResumeAddDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("resume")
public class ExportController {

    @PostMapping(value = "exportPDF")
    public String exportPdf(@RequestBody ResumeAddDTO dto, HttpServletResponse response) throws UnsupportedEncodingException {
        // 1.指定解析器
        System.setProperty("javax.xml.parsers.DocumentBuilderFactory",
                "com.sun.org.apache.xerces.internal.jaxp.DocumentBuilderFactoryImpl");
        // 使用哪套简历模板
        String path = "D:/";
        String filename = "template1.pdf";
        switch (dto.getTemplateId()){
            case 1:
                filename = "template1.pdf";
                break;
            case 2:
                filename = "template2.pdf";
                break;
        }
        // 导出格式
        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment;fileName="+dto.getName()+".pdf"
                + URLEncoder.encode(filename, "UTF-8"));
        OutputStream os = null;
        PdfStamper ps = null;
        PdfReader reader = null;
        try {
            os = response.getOutputStream();
            // 2 读入pdf表单
            reader = new PdfReader(path + "/" + filename);
            // 3 根据表单生成一个新的pdf
            ps = new PdfStamper(reader, os);
            // 4 获取pdf表单
            AcroFields form = ps.getAcroFields();
            // 5给表单添加中文字体 这里采用系统字体。不设置的话，中文可能无法显示
            BaseFont bf = BaseFont.createFont("C:/WINDOWS/Fonts/SIMSUN.TTC,1",
                    BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
            form.addSubstitutionFont(bf);
            // 6查询数据================================================
            Map<String, Object> data = new HashMap<>();
            data.put("name", dto.getName());
            data.put("sex", dto.getSex());
            data.put("education", dto.getEducation());
            data.put("age", dto.getAge());
            data.put("phone", dto.getPhone());
            data.put("workyear", dto.getWorkyear());
            data.put("email", dto.getEmail());
            data.put("address", dto.getAddress());
            data.put("position", dto.getPosition());
            data.put("beginDate", dto.getBeginDate());
            data.put("endDate", dto.getEndDate());
            data.put("salary", dto.getSalary());
            data.put("school", dto.getSchool());
            data.put("professional", dto.getProfessional());
            data.put("skill", dto.getSkill());
            // 7遍历data 给pdf表单表格赋值
            for (String key : data.keySet()) {
                form.setField(key, data.get(key).toString());
            }
            ps.setFormFlattening(true);
            log.info("*******************PDF导出成功***********************");
        } catch (Exception e) {
            log.error("*******************PDF导出失败***********************");
            e.printStackTrace();
        } finally {
            try {
                ps.close();
                reader.close();
                os.close();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return null;
    }
}

```

## 数据对象

``` java
package com.qf.resume.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
public class ResumeAddDTO {
    private Integer id;
    private Integer templateId;
    private String name;
    private String sex;
    private String education;
    private Integer age;
    private String phone;
    private Integer workyear;
    private String email;
    private String address;
    private String position;
    private String salary;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date beginDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    private String school;
    private String professional;
    private String skill;

}
```



模板文件

![image-20221007201957477](https://qfedu-1254123199.cos.ap-nanjing.myqcloud.com/img/image-20221007201957477.png)


> 注意：
>
> pdf模板文件需要使用Adobe Acrobat Pro在需要指定变量的位置，设置文本域
>
> 文本域中的内容会被后端数据替换！



::: details 本文代码

[代码仓库](http://heyige.cn/root/pdf-demo)

:::


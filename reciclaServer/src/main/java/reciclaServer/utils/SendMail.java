package reciclaServer.utils;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.select.Elements;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Properties;

public class SendMail {

    public SendMail(){

    }

    public void sendRecoverMail(String fromUserEmail, String fromUserPassword, String fromUserFullName, String toEmail, String subject, String myCode) throws MessagingException, IOException {

        Properties properties = System.getProperties();
        properties.put("mail.smtp.starttls.enable", "true");
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.host", "smtp.gmail.com");
        properties.put("mail.smtp.port", "587");

        javax.mail.Session mailSession = Session.getDefaultInstance(properties, null);

        String fileBody = this.readHtmlFromFile("emailRecoverPassword.html");
        String body = this.setContentCode(fileBody, myCode);

        MimeMessage msg = new MimeMessage(mailSession);
        msg.setFrom(new InternetAddress(fromUserEmail, fromUserFullName));
        msg.setRecipient(Message.RecipientType.TO, new InternetAddress(toEmail));
        msg.setSubject(subject);
        msg.setContent(body, "text/html");

        Transport transport = mailSession.getTransport("smtp");
        transport.connect("smtp.gmail.com", fromUserEmail, fromUserPassword);
        transport.sendMessage(msg, msg.getAllRecipients());
        transport.close();
    }

    public String readHtmlFromFile(String filePath) throws IOException {
        StringBuilder contentBuilder = new StringBuilder();

        ClassLoader classLoader = SendMail.class.getClassLoader();
        InputStream inputStream = classLoader.getResourceAsStream(filePath);

        BufferedReader in = new BufferedReader(new InputStreamReader(inputStream));
        String str;
        while ((str = in.readLine()) != null) {
            contentBuilder.append(str);
        }
        in.close();

        return contentBuilder.toString();
    }

    public String setContentCode(String html, String code){
        Document doc = Jsoup.parse(html);

        Elements codeElement = doc.select("span[id^=code-recover-password]");
        codeElement.get(0).text(code);

        return doc.toString();
    }
}

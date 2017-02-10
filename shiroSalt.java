//shiro MD5加盐 加密
public class PasswordHelper {  
    private RandomNumberGenerator randomNumberGenerator =  
     new SecureRandomNumberGenerator();  
    private String algorithmName = "md5";  
    private final int hashIterations = 2;  
    public void encryptPassword(User user) {  
        user.setSalt(randomNumberGenerator.nextBytes().toHex());  
        String newPassword = new SimpleHash(  
                algorithmName,  
                user.getPassword(),  
                ByteSource.Util.bytes(user.getCredentialsSalt()),  
                hashIterations).toHex();  
        user.setPassword(newPassword);  
    }  
}  

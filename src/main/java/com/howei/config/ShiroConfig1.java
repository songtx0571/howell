package com.howei.config;

import com.howei.config.redis.RedisSessionDao;
import com.howei.realm.LoginRealm;
import org.apache.shiro.authc.credential.CredentialsMatcher;
import org.apache.shiro.spring.LifecycleBeanPostProcessor;
import org.apache.shiro.spring.web.ShiroFilterFactoryBean;
import org.apache.shiro.web.filter.authc.AnonymousFilter;
import org.apache.shiro.web.mgt.DefaultWebSecurityManager;
import org.apache.shiro.web.servlet.SimpleCookie;
import org.apache.shiro.web.session.mgt.DefaultWebSessionManager;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.web.filter.DelegatingFilterProxy;

import javax.servlet.DispatcherType;
import javax.servlet.Filter;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@Configuration
public class ShiroConfig1 {

    @Value("${shiro.loginUrl}")
    private String masterLoginUrl;

    @Value("${shiro.jessionid}")
    private String jessionId;
    @Value("${shiro.conf.sessionTimeout}")
    private Integer maxAge;

    //将验证方式加入容器
    @Bean("loginRealm")
    @DependsOn(value = "lifecycleBeanPostProcessor")
    public LoginRealm loginRealm() {
        LoginRealm loginRealm = new LoginRealm();
        return loginRealm;
    }

    /**
     * FilterRegistrationBean
     *
     * @return
     */
    @Bean
    public FilterRegistrationBean filterRegistrationBean() {
        FilterRegistrationBean filterRegistration = new FilterRegistrationBean();
        filterRegistration.setFilter(new DelegatingFilterProxy("shiroFilter"));
        filterRegistration.setEnabled(true);
        filterRegistration.addUrlPatterns("/*");
        filterRegistration.setDispatcherTypes(DispatcherType.REQUEST);
        return filterRegistration;
    }

    /**
     * @return
     * @see ShiroFilterFactoryBean
     */
    @Bean(name = "shiroFilter")
    public ShiroFilterFactoryBean shiroFilter(@Qualifier("securityManager") DefaultWebSecurityManager securityManager) {
        ShiroFilterFactoryBean bean = new MShiroFilterFactoryBean(); //指向自定义过滤器，自定义过滤器对js/css等忽略
        bean.setSecurityManager(securityManager);
        bean.setLoginUrl(masterLoginUrl);
        Map<String, Filter> filters = new LinkedHashMap<>();
        filters.put("anon", new AnonymousFilter());
        bean.setFilters(filters);
        //shiro配置过滤规则少量的话可以用hashMap,数量多了要用LinkedHashMap,保证有序，原因未知
        Map<String,String> map1=new HashMap<>();
        map1.put("/logout","logout");
        //首页
        bean.setSuccessUrl("/home");
        bean.setFilterChainDefinitionMap(map1);
        return bean;
    }


    @Bean("getRedisSessionDao")
    public RedisSessionDao getRedisSessionDao() {
        return new RedisSessionDao();
    }

    /**
     * @return
     * @see DefaultWebSessionManager
     */
    @Bean(name = "sessionManager")
    public DefaultWebSessionManager defaultWebSessionManager(RedisSessionDao redisSessionDao) {
        DefaultWebSessionManager sessionManager = new DefaultWebSessionManager();
        sessionManager.setGlobalSessionTimeout(14400000); //4小时
        sessionManager.setDeleteInvalidSessions(true);
        sessionManager.setSessionDAO(redisSessionDao);
        sessionManager.setSessionValidationSchedulerEnabled(true);
        //设置session失效的扫描时间, 清理用户直接关闭浏览器造成的孤立会话 默认为 1个小时
        //设置该属性 就不需要设置 ExecutorServiceSessionValidationScheduler 底层也是默认自动调用ExecutorServiceSessionValidationScheduler
        //设置为5分钟,失效检查时间
       // sessionManager.setSessionValidationInterval(300000);
        //是否开启删除无效的session对象  默认为true
        sessionManager.setDeleteInvalidSessions(true);
        sessionManager.setSessionIdCookie(getSessionIdCookie());
        return sessionManager;
    }

    /**
     * @return
     * @see org.apache.shiro.mgt.SecurityManager
     */
    @Bean(name = "securityManager")
    public DefaultWebSecurityManager securityManager(LoginRealm userRealm, RedisSessionDao redisSessionDao) {
        DefaultWebSecurityManager manager = new DefaultWebSecurityManager();
        manager.setRealm(userRealm);
        manager.setSessionManager(defaultWebSessionManager(redisSessionDao));
        return manager;
    }

    /**
     * 给shiro的sessionId默认的JSSESSIONID名字改掉
     *
     * @return
     */
    @Bean(name = "sessionIdCookie")
    public SimpleCookie getSessionIdCookie() {
        SimpleCookie simpleCookie = new SimpleCookie(jessionId);
        simpleCookie.setPath("/");
        simpleCookie.setHttpOnly(true);
        simpleCookie.setMaxAge(maxAge);
        return simpleCookie;
    }

    @Bean(name = "credentialsMatcher")
    public CredentialsMatcher credentialsMatcher() {
        return new RetryLimitHashedCredentialsMatcher();
    }

    /**
     * 该类如果不设置为static，@Value注解就无效，原因未知
     *
     * @return
     */
    @Bean("lifecycleBeanPostProcessor")
    public static LifecycleBeanPostProcessor lifecycleBeanPostProcessor() {
        return new LifecycleBeanPostProcessor();
    }

}

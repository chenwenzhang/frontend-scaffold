<h1>freemarker template engine</h1>
<p>${username!""}</p>
<#if list??>
    <ul>
        <#list list as item>
            <li>${item.id} - ${item.title}</li>
        </#list>
    </ul>
</#if>
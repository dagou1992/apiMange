import marked from 'marked';

const rendererMD = new marked.Renderer();
const options = {
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
};
const table = value => {
    let content = `
    |参数|必选|类型|说明| \n
    |:----- |:-------|:-----|----- | \n
    `;
    for (let item of value) {
        const {name, isRequired, remark, value} = item;
        content += `
        |${name} |${isRequired} |${value}|${remark} | \n
        `
    }
    return content;
};
export const getMarkdown = list => {
    let content = '', index = 1;
    for (let item of list) {
        const {
            name,
            path,
            type,
            requestParam,
            reponseExample,
        } = item;
        const {
            body,
            query,
            rest,
        } = requestParam;
        content += 
        `### ${index}. ${name} \n
        #### URL \n
        > ${path} \n
        #### HTTP请求方式 \n
        > ${type} \n
        ${(body.model === 'form-data' || body.model === 'x-www-form-urlencoded') && `#### 请求参数${table(body.data)}`} \n
        ${query.length > 0 && `#### query参数${table(body.data)}`} \n
        ${rest.length > 0 && `#### rest${table(body.data)}`} \n
        ${body.model === 'row' && `#### 请求示例${body.conetnt}`} \n
        #### 返回示例 \n
        ${reponseExample} \n
        `;
        index += 1;
    }
    console.log(
        marked(content, options),
    );
    return marked(content, options);
};

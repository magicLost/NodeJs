
module.exports = (template, data) => {
    let output = template.replace(/{%NAME%}/g, data.name);
    output = output.replace(/{%AGE%}/g, data.age);
    return output;
};

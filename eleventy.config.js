export default async function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.setLayoutsDirectory("../layouts");
    eleventyConfig.setInputDirectory("pages");
    eleventyConfig.setOutputDirectory("dist");
};
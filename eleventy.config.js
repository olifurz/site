export default async function(eleventyConfig) {
    eleventyConfig.setLayoutsDirectory("../layouts");
    eleventyConfig.setInputDirectory("pages");
    eleventyConfig.setOutputDirectory("dist");

    eleventyConfig.addPassthroughCopy("media");
    eleventyConfig.addCollection("blog", (collection) =>
        collection.getFilteredByTag("blog-post").reverse()
    );

    eleventyConfig.addPassthroughCopy("site.webmanifest");
    eleventyConfig.addPassthroughCopy(".htaccess");


};
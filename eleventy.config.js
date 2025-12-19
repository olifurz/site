export default async function (eleventyConfig) {
    eleventyConfig.setLayoutsDirectory("../layouts");
    eleventyConfig.setInputDirectory("pages");
    eleventyConfig.setOutputDirectory("dist");

    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("scripts");
    eleventyConfig.addCollection("blog", (collection) =>
        collection.getFilteredByTag("blog-post").reverse()
    );
    eleventyConfig.addPassthroughCopy("scripts");

    eleventyConfig.addPassthroughCopy("site.webmanifest");
    eleventyConfig.addPassthroughCopy("button.gif");
};
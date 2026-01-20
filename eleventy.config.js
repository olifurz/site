import { feedPlugin } from "@11ty/eleventy-plugin-rss";

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
    eleventyConfig.addPassthroughCopy("favicon.ico");
    eleventyConfig.addPassthroughCopy("styles.css");

    eleventyConfig.addPlugin(feedPlugin, {
        type: "atom",
        outputPath: "/feed.xml",
        collection: {
            name: "blog",
            limit: 10,
        },
        metadata: {
            language: "en",
            title: "oli's blog",
            subtitle: "my personal blog to stay up to date with my whrreabouts",
            base: "https://olifurz.com/",
            author: {
                name: "oli",
                email: "oli@olifurz.com", 
            }
        }
    });
};
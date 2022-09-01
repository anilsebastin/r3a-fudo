import sanityClient from "@sanity/client";
import ImageUrlBuilder from "@sanity/image-url";

export const client = sanityClient({
    projectId: "6y5bw108",
    dataset: 'production',
    apiVersion: "2022-08-29",
    useCdn: true,
    token: "sk9QwImeZJAlg8iVvNTbsLPphTcVhs8aosKd8JK0vZUpBAzIRg6sOJoaeFIEXCwdOQPDYpHSOvw3fNBNx3C6k6D1BmTvL8C0Ry6eR18Nia4uhuhjLBqdHzuLMCXPxy1bHnMor92wUASJ4W41h3StGMEVYRurqAUuD3W4YxQWcd18Zayz3crP"
})

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source)
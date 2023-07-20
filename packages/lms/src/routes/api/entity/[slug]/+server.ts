import { error, json, type RequestHandler } from "@sveltejs/kit";
import { test } from "@mollify/cli";

export const GET: RequestHandler = async ({ params, url }) => {
    const { slug } = params;
    const includeChildren = Boolean(url.searchParams.get("children"));
    const includeParents = Boolean(url.searchParams.get("parents"));

    if (!slug) {
        throw error(400, "No slug provided")
    }

    // const entity = await actions.entity.getBySlug(slug);
    const entity = {}

    // get entity

    // get children

    // get parents

    return json(entity)
}
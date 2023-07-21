import { error, json, type RequestHandler } from "@sveltejs/kit";
import cli from "@mollify/cli/bin/index.mjs";

export const GET: RequestHandler = async ({ params, url }) => {
    const { slug } = params;
    const includeChildren = Boolean(url.searchParams.get("children"));
    const includeParents = Boolean(url.searchParams.get("parents"));

    if (!slug) {
        throw error(400, "No slug provided")
    }

    const entity = await cli.actions.entity.getBySlug(slug);

    // get entity

    // get children

    // get parents

    return json(entity)
}
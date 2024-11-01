"use server"

import {auth} from "@/auth";
import {parseServerActionResponse} from "@/lib/utils";
import slugify from "slugify";

export const createPitch = async (
    state: any,
    form: FormData,
    pitch: string,
) => {
    const session = await auth();

    if (!session)
        return parseServerActionResponse({
            error: "Not signed in",
            status: "ERROR",
        });

    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch"),
    );

    const slug = slugify(title as string, { lower: true, strict: true });

}
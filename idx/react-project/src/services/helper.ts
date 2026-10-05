import type {
    ImageFieldSchema,
    RegistryComponentProps,
} from "../components/ComponentRegistry";

export const getImageFieldSchema = (
    config: RegistryComponentProps | null,
    fieldName: string
): ImageFieldSchema | undefined => {
    const field = config?.propSchema?.[fieldName];

    if (
        field &&
        typeof field !== "boolean" &&
        "multiImage" in field
    ) {
        return field;
    }

    return undefined;
};
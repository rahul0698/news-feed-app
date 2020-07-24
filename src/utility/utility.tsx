export const updateObject = (oldObject: any, updatedObjectProperties: any) => {
    return {
        ...oldObject,
        ...updatedObjectProperties
    };
};
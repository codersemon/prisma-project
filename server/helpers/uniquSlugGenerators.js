// dependencies
import prisma from "../prisma/prismaClient.js";
import { createSlug } from "./helpers.js";

/**
 * Generate unique slug for product by comparing with db
 * @param {*} title - take product title
 * @returns - unique slug
 */
export const generateProductUniqeSlug = async(title) => {
    let slug = createSlug(title);
    let count = 1;

    // check if the slug already exist 
    while(await prisma.products.findUnique({where: {slug}})){
        // If slug exist, then increase count 
        slug = `${slug}-${count}`;
        count += 1;
    }

    // retur original or  modified slug 
    return slug;
}

/**
 * Generate unique slug for catgory by comparing with db
 * @param {*} title - take product title
 * @returns - unique slug
 */
export const generateProductCategoryUniqeSlug = async(title) => {
    let slug = createSlug(title);
    let count = 1;

    // check if the slug already exist 
    while(await prisma.productCategories.findUnique({where: {slug}})){
        // If slug exist, then increase count 
        slug = `${slug}-${count}`;
        count += 1;
    }

    // retur original or  modified slug 
    return slug;
}
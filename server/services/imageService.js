import sharp from "sharp";
import path from "path";
import "dotenv/config";

const IMAGE_ROOT = process.env.IMAGE_ROOT; 

export const convertTiffToPng = async (dir, file, width = 800) => {
    const tiffPath = path.join(
        IMAGE_ROOT,
        dir,
        file.replace(/\.png$/i, ".tiff"),
    );

    const image = sharp(tiffPath);

    const buffer = await image
        .resize({
            width: width,
            height: null,
            fit: sharp.fit.inside,
            withoutEnlargement: true,
        })
        .png({ compressionLevel: 8 })
        .toBuffer();

    return buffer;
};

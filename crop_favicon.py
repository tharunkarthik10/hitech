import sys
from PIL import Image

def crop_favicon(input_path, output_path):
    try:
        img = Image.open(input_path)
        img = img.convert("RGBA")
        
        # Get bounding box of the non-transparent or non-white parts if possible,
        # but to simply remove the text at the bottom, we can crop the bottom 25% of the image.
        width, height = img.size
        
        # We will crop the bottom 25% to remove the HITECH text
        new_height = int(height * 0.75)
        
        # Crop box is (left, upper, right, lower)
        # We also want to make it somewhat square for a favicon, so we will take a square
        # from the top-center.
        
        # Crop out the bottom 25% first
        img_cropped = img.crop((0, 0, width, new_height))
        
        # Now find the bounding box of the actual content
        bbox = img_cropped.getbbox()
        if bbox:
            img_cropped = img_cropped.crop(bbox)
            
        # Make it a square for favicon
        cw, ch = img_cropped.size
        size = max(cw, ch)
        
        new_img = Image.new("RGBA", (size, size), (255, 255, 255, 0))
        # paste in center
        offset = ((size - cw) // 2, (size - ch) // 2)
        new_img.paste(img_cropped, offset)
        
        # Resize to standard favicon size
        new_img.thumbnail((256, 256), Image.Resampling.LANCZOS)
        
        new_img.save(output_path)
        print(f"Successfully created favicon at {output_path}")
    except Exception as e:
        print(f"Error: {e}")

crop_favicon("public/hitech_logo.png", "public/favicon.png")

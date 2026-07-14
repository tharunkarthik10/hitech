from PIL import Image

def remove_white_bg(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()
    
    new_data = []
    for item in data:
        # Check if pixel is close to white (255, 255, 255)
        # item is (R, G, B, A)
        if item[0] > 255 - tolerance and item[1] > 255 - tolerance and item[2] > 255 - tolerance:
            # Change to transparent
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(output_path)

if __name__ == "__main__":
    remove_white_bg("public/new_person.png", "public/new_person_transparent.png")

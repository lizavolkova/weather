const image_folder = "/weather-photos/"
const images = [
    {
        name: "clear",
        image: `${image_folder}day/clear-skies.jpg`,
        width: "1250",
        height: "703",
        code: 800
    }
]

export const getImage = (name) => {
    return images.find((image) => name === image.name).image;
}

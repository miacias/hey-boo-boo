module.exports = {
    // formats date for handlebars views
    format_time: (date) => {
        const timestamp = new Intl.DateTimeFormat("en", {
            timeStyle: "short",
            dateStyle: "medium"
        }).format(date);
        return timestamp;
    },
    hasEvents: (hosting, attending) => {
        if (hosting || attending) {
            return true;
        } else {
            return false;
        }
    },
    newPicnicUrl: (url) => {
        if (url === '/new-picnic') {
            return true;
        } else {
            return false;
        }
    },
    myPicnicsUrl: (url) => {
        if (url === '/my-picnics') {
            return true;
        } else {
            return false;
        }
    },
    // randomly selects vertical image from provided list
    verticalPhoto: () => {
        const verticalPhotos = [
            '2019 - Krisztina Papp (Unsplash).jpg',
            '2020 - Annie Spratt (Unsplash).jpg',
            '2020 - Kateryna Hliznitsova (Unsplash).jpg',
            '2021 - Elena Popova (Unsplash).jpg',
            '2021 - Taisiia Shestopal (Unsplash).jpg',
            '2021 1 - Mariah Hewines (Unsplash).jpg',
            '2021 2 - Mariah Hewines (Unsplash).jpg',
            'Chestnut Brown Ruled Notebook on Picnic Blanket in Summer, Cheese, Wine, Orange, Beechmore Books (Unsplash).jpg',
            'First day of summer - Svetlana Kuznetsova (Unsplash).jpg',
            'French picnic setup - Calvin Shelwell (Unsplash).jpg',
            'Kateryna Hliznitsova (Unsplash).jpg',
            'New Farm Park, 新農場 昆士蘭州澳洲 - Jojo Yuen sharemyfoodd (Unsplash).jpg',
            'Pallet table with food and place settings - Mariah Hewines (Unsplash).jpg',
            'Picnic in the park ☀️🤍 - Priyanka Aggarwal (Unsplash).jpg',
            'Picnic on the beach - Sixteen Miles Out (Unsplash).jpg',
            'Royal Botanical Garden Edinburgh, Edinburgh, United Kingdom - Maria Ilves (Unsplash).jpg'
        ];
        // random index number
        const random = Math.floor(Math.random() * verticalPhotos.length);
        return verticalPhotos[random];
    },
    // randomly selects horizontal image from provided list
    horizontalPhoto: () => {
        const horizontalPhotos = [
            '2019 - Ben Moreland (Unsplash).jpg',
            '2019 - Jonathan Borba (Unsplash).jpg',
            '2020 - Deval Parikh (Unsplash).jpg',
            '2020 - Evangelina Silina (Unsplash).jpg',
            'Kateryna Hliznitsova 2 (Unsplash).jpg',
            'Picnic in the garden - sq lim (Unsplash).jpg',
            'Portezuelo Park, Ahuachapán, El Salvador - Jennie Clavel (Unsplash).jpg',
            'Redwood Forest, East Warburton, Australia - britt gaiser (Unsplash).jpg',
            'S\'well Drink Chiller  1 - S\'well (Unsplash).jpg',
            'S\'well Drink Chiller  2 - S\'well (Unsplash).jpg',
            'The peace of an outside breakfast - Massimo Adami (Unsplash).jpg',
            'We just had flower class with cote a cote fleur. And having wonderful brunch - Lee Myungseong (Unsplash).jpg'
        ];
        // random index number
        const random = Math.floor(Math.random() * horizontalPhotos.length);
        return horizontalPhotos[random];
    },
    // randomly selects bear photograph from provided list
    bearPhoto: () => {
        const bearPhotos = [
            '2018 - Thomas Bonometti (Unsplash).jpg',
            '2019 - Dušan veverkolog (Unsplash).jpg',
            '2019 - Francesco (Unsplash).jpg',
            '2019 - Owlie Harrington (Unsplash).jpg',
            '2019 - Roxanna López Piedrafuette (Unsplash).jpg',
            '2019 - Zdeněk Macháček (Unsplash).jpg',
            '2018 - Thomas Bonometti (Unsplash).jpg',
            '2019 - Dušan veverkolog (Unsplash).jpg',
            '2019 - Francesco (Unsplash).jpg',
            '2019 - Le Mucky (Unsplash).jpg',
            '2019 - Owlie Harrington (Unsplash).jpg',
            '2019 - Roxanna López Piedrafuette (Unsplash).jpg',
            '2019 - Zdeněk Macháček (Unsplash).jpg',
            '2020 - Fabe collage (Unsplash).jpg',
            '2020 - mana5280 (Unsplash).jpg',
            '2020 - Nico Meier (Unsplash).jpg',
            '2020 - Rey Emsen (Unsplash).jpg',
            '2020 2 - mana5280 (Unsplash).jpg',
            '2020 3 - mana5280 (Unsplash).jpg',
            '2021 - Alvaro Calvo (Unsplash).jpg',
            '2021 - mana5280 (Unsplash).jpg',
            '2021 - Max Saeling (Unsplash).jpg',
            '2021 - Mohamed Elsayed (Unsplash).jpg',
            '2021 - Rey Emsen (Unsplash).jpg',
            '2021 2 - Max Saeling (Unsplash).jpg',
            'A momma bear and her cub in Boulder Valley - Ben Owen (Unsplash).jpg',
            'Alaska brown bear - Elizabeth Meyers (Unsplash).jpg',
            'Alberta Wild - Richard Lee (Unsplash).jpg',
            'BÄRENWALD, Österreich - Daniel Diesenreither (Unsplash).jpg',
            'bear - Becca (Unsplash).jpg',
            'bear - Joshua Hoehne (Unsplash).jpg',
            'bear in the forest - Eugene Chystiakov (Unsplash).jpg',
            'Bear smiling in Wildpark Knüll - Tom Radetzki (Unsplash).jpg',
            'bears - Lisa Yount (Unsplash).jpg',
            'Beary thoughts - Matthias Götzke (Unsplash).jpg',
            'British Columbia - Rey Emsen (Unsplash).jpg',
            'Brown bear hunting for fish - Federico Artusi (Unsplash).jpg',
            'Brown bear in the wild forest - Eugene Chystiakov (Unsplash).jpg',
            'Brown Bear, Kodiak Island, Alaska - Brent Jones (Unsplash).jpg',
            'Brown Bears, Kodiak Island, Alaska 2 - Brent Jones (Unsplash).jpg',
            'Custer, SD, USA - Stephanie LeBlanc (Unsplash).jpg',
            'dancing bear - mana5280 (Unsplash).jpg',
            'Grizzly bear sow. Jasper National Park - Richard Lee (Unsplash).jpg',
            'Grumpy brown bear - NOAA (Unsplash).jpg',
            'Les Angles, France - Max Saeling (Unsplash).jpg',
            'Lonely bear - Mark Basarab (Unsplash).jpg',
            'Rhodes, France - Thomas Bonometti (Unsplash).jpg',
            'Saint-Félicien, QC, Canada - Céline Chamiot-Poncet (Unsplash).jpg',
            'sleeping beauty - Daniele Levis Pelusi (Unsplash).jpg',
            'Sweden - Janko Ferlič (Unsplash).jpg',
            'Thoughtful grizzly - Thomas Lefebvre (Unsplash).jpg',
            'Vancouver, BC, Canada - Danika Perkinson (Unsplash).jpg',
            'wild - anthony renovato (Unsplash).jpg',
            'Wildpark Lüneburger Heide, Nindorf, Germany - Mika Brandt (Unsplash).jpg',
            'Wildwood, Herne Bay, UK - Andy Holmes (Unsplash).jpg'
        ];
        // random index number
        const random = Math.floor(Math.random() * bearPhotos.length);
        return bearPhotos[random];
    }
}
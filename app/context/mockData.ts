// Mock database seed files for RestoApp

export interface Dish {
  id: number;
  name: string;
  category: string;
  price: string;
  rating: number;
  tag: string;
  desc: string;
  image: string;
  isVeg: boolean;
}

export interface Restaurant {
  id: string;
  restaurantName: string;
  email: string;
  city: string;
  address: string;
  contact: string;
  cuisines: string;
  rating: number;
  deliveryTime: string;
  costForTwo: string;
  tag: string;
  image: string;
  isVeg: boolean;
}

export const SEED_RESTAURANTS: Restaurant[] = [
  {
    id: 'res-1',
    restaurantName: 'Burger Junction',
    email: 'contact@burgerjunction.com',
    city: 'Mumbai',
    address: 'Food Court, Phoenix Mall, Lower Parel',
    contact: '9876543210',
    cuisines: 'Burgers, Fast Food, Drinks',
    rating: 4.5,
    deliveryTime: '20 mins',
    costForTwo: '₹350 for two',
    tag: 'Trending',
    image: '/burger_junction_banner.png',
    isVeg: false,
  },
  {
    id: 'res-2',
    restaurantName: 'Bakehouse Pizza',
    email: 'hello@bakehouse.com',
    city: 'Delhi',
    address: 'Connaught Place, Radial Road 2',
    contact: '9876543211',
    cuisines: 'Pizza, Italian, Desserts',
    rating: 4.8,
    deliveryTime: '30 mins',
    costForTwo: '₹500 for two',
    tag: 'Chef Special',
    image: '/bakehouse_pizza_banner.png',
    isVeg: false,
  },
  {
    id: 'res-3',
    restaurantName: 'Noodle Bar',
    email: 'info@noodlebar.com',
    city: 'Bangalore',
    address: '100 Feet Road, Indiranagar',
    contact: '9876543212',
    cuisines: 'Chinese, Asian, Chowmein',
    rating: 4.3,
    deliveryTime: '15 mins',
    costForTwo: '₹300 for two',
    tag: 'Top Rated',
    image: '/noodle_bar_banner.png',
    isVeg: true,
  },
  {
    id: 'res-4',
    restaurantName: 'Gourmet Salad Co',
    email: 'contact@gourmetsalad.com',
    city: 'Mumbai',
    address: 'Bandra Kurla Complex, G Block',
    contact: '9876543213',
    cuisines: 'Healthy, Salads, Juices',
    rating: 4.6,
    deliveryTime: '15 mins',
    costForTwo: '₹400 for two',
    tag: 'Fit Choice',
    image: '/gourmet_salad_banner.png',
    isVeg: true,
  },
  {
    id: 'res-5',
    restaurantName: 'Sweet Retreat',
    email: 'desserts@sweetretreat.com',
    city: 'Mumbai',
    address: 'Carter Road, Bandra West',
    contact: '9876543214',
    cuisines: 'Desserts, Ice Cream, Bakery',
    rating: 4.9,
    deliveryTime: '20 mins',
    costForTwo: '₹250 for two',
    tag: 'Popular',
    image: '/sweet_retreat_banner.png',
    isVeg: true,
  },
  {
    id: 'res-6',
    restaurantName: 'The Coffee Club',
    email: 'info@coffeeclub.com',
    city: 'Pune',
    address: 'Koregaon Park, Lane 5',
    contact: '9876543215',
    cuisines: 'Drinks, Coffee, Snacks',
    rating: 4.4,
    deliveryTime: '10 mins',
    costForTwo: '₹200 for two',
    tag: 'Quick Bite',
    image: '/coffee_club_banner.png',
    isVeg: true,
  }
];

export const DEFAULT_DISHES_MAP: Record<string, Dish[]> = {
  'res-1': [
    { id: 101, name: 'Truffle Mushroom Burger', category: 'Burgers', price: '₹299', rating: 4.9, tag: 'Best Seller', desc: 'Juicy wagyu beef patty, wild truffles, melted swiss cheese, caramelized onions on a brioche bun.', image: '/burger_dish.png', isVeg: false },
    { id: 102, name: 'Crispy Korean Fried Chicken', category: 'Burgers', price: '₹249', rating: 4.8, tag: 'New', desc: 'Spicy glazed crispy chicken, house kimchi slaw, pickled cucumbers on toasted sesame bun.', image: '/burger_junction_banner.png', isVeg: false },
    { id: 103, name: 'Classic French Fries', category: 'Sides', price: '₹129', rating: 4.5, tag: 'Crispy', desc: 'Golden skin-on french fries seasoned with sea salt and served with house garlic aioli.', image: '/french_fries.png', isVeg: true },
    { id: 104, name: 'Oreo Fudge Shake', category: 'Drinks', price: '₹159', rating: 4.7, tag: 'Cooler', desc: 'Creamy vanilla shake blended with chocolate oreos, fudge sauce, and whipped cream.', image: '/shake_dish.png', isVeg: true }
  ],
  'res-2': [
    { id: 201, name: 'Pepperoni & Honey Pizza', category: 'Pizza', price: '₹449', rating: 4.8, tag: 'Trending', desc: 'Artisanal sourdough crust, hot honey drizzle, fresh mozzarella, double pepperoni, and fresh basil.', image: '/pizza_dish.png', isVeg: false },
    { id: 202, name: 'Margherita Basil Pizza', category: 'Pizza', price: '₹349', rating: 4.7, tag: 'Classic', desc: 'Sourdough crust topped with rich tomato passata, fresh buffalo mozzarella, olive oil, and organic basil.', image: '/bakehouse_pizza_banner.png', isVeg: true },
    { id: 203, name: 'Garlic Breadsticks', category: 'Sides', price: '₹179', rating: 4.6, tag: 'Cheesy', desc: 'Freshly baked bread sticks brushed with garlic butter and loaded with mozzarella cheese.', image: '/french_fries.png', isVeg: true },
    { id: 204, name: 'Tiramisu Cup', category: 'Dessert', price: '₹229', rating: 4.9, tag: 'Sweet', desc: 'Layers of espresso-soaked ladyfingers, rich mascarpone sabayon, and premium cocoa powder.', image: '/sweet_retreat_banner.png', isVeg: true }
  ],
  'res-3': [
    { id: 301, name: 'Veg Chowmein', category: 'Chowmein', price: '₹149', rating: 4.8, tag: 'New', desc: 'Stir-fried noodles tossed with fresh vegetables and savory Indo-Chinese sauces. Hot, flavorful, and satisfying.', image: '/noodle_bar_banner.png', isVeg: true },
    { id: 302, name: 'Chicken Hakka Noodles', category: 'Chowmein', price: '₹199', rating: 4.7, tag: 'Trending', desc: 'Wok-tossed noodles with tender shredded chicken, crunchy cabbage, and dark soy sauce.', image: '/noodle_bar_banner.png', isVeg: false },
    { id: 303, name: 'Paneer Chilli Dry', category: 'Sides', price: '₹249', rating: 4.6, tag: 'Spicy', desc: 'Crispy paneer cubes tossed with bell peppers, green chillies, onions, and spicy dark soy sauce.', image: '/burger_dish.png', isVeg: true },
    { id: 304, name: 'Crispy Spring Rolls', category: 'Sides', price: '₹129', rating: 4.4, tag: 'Snack', desc: 'Thin pastry skins wrapped around spiced stir-fried vegetables and deep fried to golden perfection.', image: '/french_fries.png', isVeg: true }
  ],
  'res-4': [
    { id: 401, name: 'Avocado Caesar Salad', category: 'Salads', price: '₹299', rating: 4.6, tag: 'Healthy', desc: 'Crisp romaine lettuce, fresh avocados, shaved parmesan, garlic croutons, house Caesar dressing.', image: '/gourmet_salad_banner.png', isVeg: true },
    { id: 402, name: 'Greek Quinoa Bowl', category: 'Salads', price: '₹279', rating: 4.5, tag: 'Nutritious', desc: 'Organic quinoa, cucumbers, cherry tomatoes, kalamata olives, feta cheese, and lemon herb vinaigrette.', image: '/gourmet_salad_banner.png', isVeg: true },
    { id: 403, name: 'Green Detox Juice', category: 'Drinks', price: '₹149', rating: 4.8, tag: 'Cold Pressed', desc: 'Fresh blend of spinach, cucumber, green apple, celery, and a hint of organic ginger.', image: '/coffee_club_banner.png', isVeg: true }
  ],
  'res-5': [
    { id: 501, name: 'Warm Pistachio Brownie', category: 'Dessert', price: '₹199', rating: 4.9, tag: 'Chef Choice', desc: 'Rich dark chocolate fudge brownie topped with crushed Iranian pistachios and vanilla gelato.', image: '/sweet_retreat_banner.png', isVeg: true },
    { id: 502, name: 'Belgian Waffle Combo', category: 'Dessert', price: '₹229', rating: 4.8, tag: 'Classic', desc: 'Freshly ironed waffle with dark chocolate syrup, fresh strawberries, and icing powder.', image: '/sweet_retreat_banner.png', isVeg: true },
    { id: 503, name: 'Red Velvet Cupcake', category: 'Dessert', price: '₹99', rating: 4.6, tag: 'Mini Treat', desc: 'Soft red velvet sponge cupcake with a velvety smooth cream cheese frosting.', image: '/sweet_retreat_banner.png', isVeg: true }
  ],
  'res-6': [
    { id: 601, name: 'Mango Passion Smoothie', category: 'Drinks', price: '₹149', rating: 4.7, tag: 'Refreshing', desc: 'Blend of fresh organic mango, passionfruit nectar, Greek yogurt, and raw wild honey.', image: '/coffee_club_banner.png', isVeg: true },
    { id: 602, name: 'Caramel Macchiato', category: 'Drinks', price: '₹189', rating: 4.6, tag: 'Hot Coffee', desc: 'Rich espresso poured over steamed milk, flavored with sweet vanilla and topped with caramel drizzle.', image: '/coffee_club_banner.png', isVeg: true },
    { id: 603, name: 'Paneer Tikka Sandwich', category: 'Sides', price: '₹159', rating: 4.5, tag: 'Quick Bite', desc: 'Tandoori spiced paneer cubes, mint chutney, and green vegetables grilled between sourdough bread.', image: '/burger_dish.png', isVeg: true }
  ]
};

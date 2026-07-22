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
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=600&q=80',
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
    { id: 101, name: 'Truffle Mushroom Burger', category: 'Burgers', price: '₹299', rating: 4.9, tag: 'Best Seller', desc: 'Juicy wagyu beef patty, wild truffles, melted swiss cheese, caramelized onions on a brioche bun.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80', isVeg: false },
    { id: 102, name: 'Crispy Korean Fried Chicken', category: 'Burgers', price: '₹249', rating: 4.8, tag: 'New', desc: 'Spicy glazed crispy chicken, house kimchi slaw, pickled cucumbers on toasted sesame bun.', image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=300&q=80', isVeg: false },
    { id: 103, name: 'Classic French Fries', category: 'Sides', price: '₹129', rating: 4.5, tag: 'Crispy', desc: 'Golden skin-on french fries seasoned with sea salt and served with house garlic aioli.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 104, name: 'Oreo Fudge Shake', category: 'Drinks', price: '₹159', rating: 4.7, tag: 'Cooler', desc: 'Creamy vanilla shake blended with chocolate oreos, fudge sauce, and whipped cream.', image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 105, name: 'Veggie Burger', category: 'Burgers', price: '₹179', rating: 4.6, tag: 'Healthy', desc: 'Veggie burger on a white plate on wooden board with a black backdrop.', image: 'https://tse2.mm.bing.net/th/id/OIP.HubUls0TEoHIJO3r0vUvLAHaEO?r=0&rs=1&pid=ImgDetMain&o=7&rm=3', isVeg: true },
    { id: 106, name: 'Aloo Tikki Burger', category: 'Burgers', price: '₹149', rating: 4.7, tag: 'Popular', desc: 'Three aloo tikki burgers on a white plate.', image: 'https://images.unsplash.com/photo-1585238342024-78d387f4a707?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 107, name: 'Finger Chips', category: 'Sides', price: '₹119', rating: 4.4, tag: 'Crispy', desc: 'Hot and crispy golden potato finger chips served with ketchup.', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 108, name: 'Mumbai Masala Sandwich', category: 'Sandwiches', price: '₹139', rating: 4.6, tag: 'Spicy', desc: 'Masala sandwich served on a white plate with potato and mint chutney filling.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 109, name: 'Bombay Sandwich', category: 'Sandwiches', price: '₹129', rating: 4.5, tag: 'Classic', desc: 'Bombay sandwich dotted with green sauce and ketchup on a white plate.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 110, name: 'Veg Cheese Toast Sandwich', category: 'Sandwiches', price: '₹159', rating: 4.7, tag: 'Cheesy', desc: 'Veg cheese toast sandwich loaded with melted mozzarella and fresh vegetables.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 111, name: 'Veg Grilled Sandwich', category: 'Sandwiches', price: '₹169', rating: 4.8, tag: 'Premium', desc: 'Grilled sandwich with the filling side shown some potato wafers on a white plate.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 112, name: 'Veg Frankie', category: 'Rolls', price: '₹119', rating: 4.6, tag: 'Street Food', desc: 'Two rolled veg frankie on a bed of grated carrots on a square shaped white plate on a burlap.', image: 'https://i.pinimg.com/originals/b0/3a/99/b03a99a8a87f4a78fa2282554c633f9a.jpg', isVeg: true },
    { id: 113, name: 'Paneer Kathi Roll', category: 'Rolls', price: '₹189', rating: 4.9, tag: 'Best Seller', desc: 'Paneer tikka, green chutney, and a mixed veggie salad wrapped in a whole wheat roti.', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSc9ndn2Ey6D6sgMEmMcUVooPqCjjN19UnjMg1az2Bju4e099ukXugeSQXX&s=10', isVeg: true },
    { id: 114, name: 'Veg Kathi Roll', category: 'Rolls', price: '₹149', rating: 4.5, tag: 'Healthy', desc: 'Vegetarian kathi roll in a hand filled with spiced vegetable stuffing.', image: 'https://images.unsplash.com/photo-1628191139360-408a064e23f7?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 115, name: 'Club Sandwich', category: 'Sandwiches', price: '₹149', rating: 4.6, tag: 'Indian Style', desc: 'Club sandwich squares with layers seen on a white plate with tomato ketchup.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 116, name: 'Paneer Shawarma', category: 'Rolls', price: '₹179', rating: 4.8, tag: 'Fusion', desc: 'Paneer shawarma wrapped in flatbread with salad and garlic mayonnaise.', image: 'https://images.unsplash.com/photo-1628191139360-408a064e23f7?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 117, name: 'Chana Sandwich', category: 'Sandwiches', price: '₹139', rating: 4.5, tag: 'High Protein', desc: 'Chana sandwich placed on a white plate with spiced chickpea filling.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 118, name: 'Samosa Sandwich', category: 'Sandwiches', price: '₹119', rating: 4.7, tag: 'Unique', desc: 'Samosa sandwich served on a white plate with mint chutney and crushed samosa.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 119, name: 'Sandwich Chutney', category: 'Sides', price: '₹49', rating: 4.8, tag: 'Signature', desc: 'Bright green colored sandwich chutney in a glass bowl (4 ingredients style).', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true }
  ],
  'res-2': [
    { id: 201, name: 'Pepperoni & Honey Pizza', category: 'Pizza', price: '₹449', rating: 4.8, tag: 'Trending', desc: 'Artisanal sourdough crust, hot honey drizzle, fresh mozzarella, double pepperoni, and fresh basil.', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=300&q=80', isVeg: false },
    { id: 202, name: 'Margherita Basil Pizza', category: 'Pizza', price: '₹349', rating: 4.7, tag: 'Classic', desc: 'Sourdough crust topped with rich tomato passata, fresh buffalo mozzarella, olive oil, and organic basil.', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 203, name: 'Garlic Breadsticks', category: 'Sides', price: '₹179', rating: 4.6, tag: 'Cheesy', desc: 'Freshly baked bread sticks brushed with garlic butter and loaded with mozzarella cheese.', image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 204, name: 'Tiramisu Cup', category: 'Dessert', price: '₹229', rating: 4.9, tag: 'Sweet', desc: 'Layers of espresso-soaked ladyfingers, rich mascarpone sabayon, and premium cocoa powder.', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 205, name: 'White Sauce Pasta', category: 'Pasta', price: '₹249', rating: 4.7, tag: 'Italian', desc: 'Creamy and rich Alfredo white sauce pasta loaded with exotic veggies.', image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 206, name: 'Mushroom Puff', category: 'Sides', price: '₹99', rating: 4.5, tag: 'Bakery Special', desc: 'Mushroom puff served on a white plate with dots of tomato sauce.', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=300&q=80', isVeg: true }
  ],
  'res-3': [
    { id: 301, name: 'Veg Chowmein', category: 'Chowmein', price: '₹149', rating: 4.8, tag: 'New', desc: 'Stir-fried noodles tossed with fresh vegetables and savory Indo-Chinese sauces. Hot, flavorful, and satisfying.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=500&q=80', isVeg: true },
    { id: 302, name: 'Chicken Hakka Noodles', category: 'Chowmein', price: '₹199', rating: 4.7, tag: 'Trending', desc: 'Wok-tossed noodles with tender shredded chicken, crunchy cabbage, and dark soy sauce.', image: 'https://images.unsplash.com/photo-1526318896980-cf78c088247c?auto=format&fit=crop&w=500&q=80', isVeg: false },
    { id: 303, name: 'Paneer Chilli Dry', category: 'Sides', price: '₹249', rating: 4.6, tag: 'Spicy', desc: 'Crispy paneer cubes tossed with bell peppers, green chillies, onions, and spicy dark soy sauce.', image: 'https://img.magnific.com/premium-photo/chilli-paneer-dry-is-made-using-cottage-cheese-indo-chinese-food_466689-76886.jpg?w=2000', isVeg: true },
    { id: 304, name: 'Crispy Spring Rolls', category: 'Sides', price: '₹129', rating: 4.4, tag: 'Snack', desc: 'Thin pastry skins wrapped around spiced stir-fried vegetables and deep fried to golden perfection.', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 305, name: 'Veg Momos', category: 'Chinese', price: '₹139', rating: 4.7, tag: 'Chef Choice', desc: 'Veg momos arranged on a white rectangular long tray with a bamboo chopsticks by the side and schezwan sauce.', image: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4869?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 306, name: 'Classic Maigi', category: 'Chowmein', price: '₹89', rating: 4.9, tag: 'Quick Bite', desc: 'Hot and delicious instant masala maggi noodles prepared with mix veggies.', image: 'https://images.unsplash.com/photo-1612966608967-302fc54ae4a0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 307, name: 'Veg Manchurian Dry', category: 'Chinese', price: '₹199', rating: 4.6, tag: 'Spicy', desc: 'Fried vegetable balls tossed in a sweet, sour, hot and spicy Manchurian sauce.', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 308, name: 'Veg Noodles', category: 'Chowmein', price: '₹159', rating: 4.7, tag: 'Popular', desc: 'Veg noodles or vegetable noodles served in a black bowl on a dark blue-gray wooden board.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 309, name: 'Hakka Noodles', category: 'Chowmein', price: '₹179', rating: 4.8, tag: 'Street Style', desc: 'Hakka noodles served in a triangular bowl on a printed napkin with cream colored bamboo chopsticks.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 310, name: 'Schezwan Fried Rice', category: 'Chinese', price: '₹169', rating: 4.7, tag: 'Spicy', desc: 'Top shot of schezwan fried rice in a black rimmed triangular bowl with bamboo chopsticks.', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 311, name: 'Schezwan Noodles', category: 'Chowmein', price: '₹179', rating: 4.6, tag: 'Fiery', desc: 'Schezwan noodles in a black rimmed cream bowl with bamboo chopsticks and a small bowl of schezwan sauce.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 312, name: 'Chilli Garlic Noodles', category: 'Chowmein', price: '₹189', rating: 4.8, tag: 'New', desc: 'Chilli garlic noodles served in a black wooden bowl with dynamic garlicky aroma.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 313, name: 'Mushroom Noodles', category: 'Chowmein', price: '₹199', rating: 4.7, tag: 'Earthy Flavors', desc: 'Mushroom noodles with scallion greens in a black bowl on a round grey-black granite board.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 314, name: 'Wheat Momos (Atta Momos)', category: 'Chinese', price: '₹149', rating: 4.6, tag: 'Healthy Alternative', desc: 'Wheat momos arranged on a black plate with black chopsticks kept on the left side.', image: 'https://images.unsplash.com/photo-1625220194771-7ebedd0b4869?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 315, name: 'American Chop Suey', category: 'Chinese', price: '₹219', rating: 4.8, tag: 'Crispy Noodles', desc: 'American chop suey served in a white bowl with fried egg (optional), crispy noodles, and sweet-sour sauce.', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 316, name: 'Singapore Noodles', category: 'Chowmein', price: '₹189', rating: 4.7, tag: 'Spiced', desc: 'Singapore noodles served in a white bowl with curry powder fragrance.', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 317, name: 'Singapore Fried Rice', category: 'Chinese', price: '₹179', rating: 4.6, tag: 'Chef Choice', desc: 'Singapore fried rice in a small black pan with lid partially closed.', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 318, name: 'Chinese Pakoda', category: 'Chinese', price: '₹129', rating: 4.5, tag: 'Street Classic', desc: 'Chinese pakoda (Cabbage Manchurian) served with fiery Schezwan sauce.', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 319, name: 'Fried Noodles', category: 'Sides', price: '₹79', rating: 4.4, tag: 'Extra Crunchy', desc: 'Crispy fried noodles served on a plate (great as soup or salad toppings).', image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 320, name: 'Chinese Bhel', category: 'Chinese', price: '₹119', rating: 4.6, tag: 'Fusion Munch', desc: 'Chinese bhel served in a red ceramic bowl with crunchy noodles and fresh veggies.', image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=300&q=80', isVeg: true }
  ],
  'res-4': [
    { id: 401, name: 'Avocado Caesar Salad', category: 'Salads', price: '₹299', rating: 4.6, tag: 'Healthy', desc: 'Crisp romaine lettuce, fresh avocados, shaved parmesan, garlic croutons, house Caesar dressing.', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 402, name: 'Greek Quinoa Bowl', category: 'Salads', price: '₹279', rating: 4.5, tag: 'Nutritious', desc: 'Organic quinoa, cucumbers, cherry tomatoes, kalamata olives, feta cheese, and lemon herb vinaigrette.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 403, name: 'Green Detox Juice', category: 'Drinks', price: '₹149', rating: 4.8, tag: 'Cold Pressed', desc: 'Fresh blend of spinach, cucumber, green apple, celery, and a hint of organic ginger.', image: 'https://images.unsplash.com/photo-1610970881699-44a5587caa9a?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 404, name: 'Fruit Chaat', category: 'Salads', price: '₹139', rating: 4.7, tag: 'Fresh', desc: 'Overhead shot of fruit chaat in white bowls placed on a cotton gray napkin on a round bamboo board.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 405, name: 'Mango Chaat', category: 'Salads', price: '₹149', rating: 4.8, tag: 'Seasonal', desc: 'Mango chaat served in a white bowl with a steel spoon with text layovers.', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 406, name: 'Sabudana Chivda', category: 'Snacks', price: '₹99', rating: 4.6, tag: 'Crunchy', desc: 'Sabudana chivda served in a white bowl with a spoon in it and kept on a white plate.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 407, name: 'Chana Chaat', category: 'Snacks', price: '₹119', rating: 4.7, tag: 'Protein Rich', desc: 'Chana chaat served in a white bowl containing nutritious and tangy chickpeas.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 408, name: 'Corn Chaat', category: 'Snacks', price: '₹129', rating: 4.8, tag: 'Healthy Snack', desc: 'Corn chaat served on a white plate with a spoon in it with text layovers.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 409, name: 'Corn Cutlet', category: 'Snacks', price: '₹139', rating: 4.5, tag: 'Golden', desc: 'Corn cutlet served on a green plate, stuffed with fresh sweet corn.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 410, name: 'Veg Cutlet', category: 'Snacks', price: '₹129', rating: 4.6, tag: 'Crispy', desc: 'Veg cutlet placed on a tray with a few slices of tomatoes, cucumber and a light green bowl of green chutney.', image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 411, name: 'Kala Chana Chaat', category: 'Snacks', price: '₹109', rating: 4.7, tag: 'Fit Choice', desc: 'Nutritious kala chana chaat served in a bowl with spices and herbs.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 412, name: 'Aloo Chana Chaat', category: 'Snacks', price: '₹119', rating: 4.6, tag: 'Spicy Tangy', desc: 'Aloo chana chaat served on a white plate with potatoes and boiled chickpeas.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 413, name: 'Peanut Chaat', category: 'Snacks', price: '₹99', rating: 4.8, tag: 'Crunchy Protein', desc: 'Two bowls of peanut chaat each made with boiled and roasted peanuts.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 414, name: 'Indori Poha', category: 'Snacks', price: '₹69', rating: 4.9, tag: 'Indore Classic', desc: 'Indori poha served on white plate with small bowls of chopped onions and sev.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 415, name: 'Ganga Jamuna Juice', category: 'Drinks', price: '₹129', rating: 4.7, tag: 'Fresh Juice', desc: 'Two glasses of ganga jamuna juice (Orange & Sweet Lime mix) on an orange wooden tray.', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 416, name: 'Buttered Corn', category: 'Snacks', price: '₹79', rating: 4.5, tag: 'Sweet & Salty', desc: 'Buttered corn seasoned with pepper and salt, served warm in a plate.', image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80', isVeg: true }
  ],
  'res-5': [
    { id: 501, name: 'Warm Pistachio Brownie', category: 'Dessert', price: '₹199', rating: 4.9, tag: 'Chef Choice', desc: 'Rich dark chocolate fudge brownie topped with crushed Iranian pistachios and vanilla gelato.', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 502, name: 'Belgian Waffle Combo', category: 'Dessert', price: '₹229', rating: 4.8, tag: 'Classic', desc: 'Freshly ironed waffle with dark chocolate syrup, fresh strawberries, and icing powder.', image: 'https://images.unsplash.com/photo-1562376502-6f769499c886?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 503, name: 'Red Velvet Cupcake', category: 'Dessert', price: '₹99', rating: 4.6, tag: 'Mini Treat', desc: 'Soft red velvet sponge cupcake with a velvety smooth cream cheese frosting.', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 504, name: 'Malpua with Rabdi', category: 'Dessert', price: '₹179', rating: 4.9, tag: 'Traditional', desc: 'Malpua with rabdi served in a oval plate on a dark blue tray.', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 505, name: 'Pazham Pori (Banana Fritters)', category: 'Dessert', price: '₹79', rating: 4.7, tag: 'Kerala Special', desc: 'Pazham pori served on a white plate. Crispy and sweet golden banana fritters.', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=300&q=80', isVeg: true }
  ],
  'res-6': [
    { id: 601, name: 'Mango Passion Smoothie', category: 'Drinks', price: '₹149', rating: 4.7, tag: 'Refreshing', desc: 'Blend of fresh organic mango, passionfruit nectar, Greek yogurt, and raw wild honey.', image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 602, name: 'Caramel Macchiato', category: 'Drinks', price: '₹189', rating: 4.6, tag: 'Hot Coffee', desc: 'Rich espresso poured over steamed milk, flavored with sweet vanilla and topped with caramel drizzle.', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 603, name: 'Paneer Tikka Sandwich', category: 'Sides', price: '₹159', rating: 4.5, tag: 'Quick Bite', desc: 'Tandoori spiced paneer cubes, mint chutney, and green vegetables grilled between sourdough bread.', image: 'https://images.unsplash.com/photo-1539252554453-80ab65ce3586?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 604, name: 'Three Idli with Sambar', category: 'South Indian', price: '₹99', rating: 4.8, tag: 'Classic', desc: 'Three idli on top of a layer of sambar in a white bowl with coconut chutney in a small bowl on top left.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 605, name: 'Street Pav Bhaji', category: 'Chaats & Snacks', price: '₹149', rating: 4.9, tag: 'Mumbai Style', desc: 'Pav bhaji served in a rectangular serving tray with buttered pav and chopped onions, cilantro and lemon wedges.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 606, name: 'Samosa (Potato Samosa)', category: 'Chaats & Snacks', price: '₹39', rating: 4.7, tag: 'All-Time Favorite', desc: 'Samosa arranged in a line on a cream tray with chutneys in small bowls and fried green chillies.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 607, name: 'Puri For Pani Puri', category: 'Chaats & Snacks', price: '₹69', rating: 4.6, tag: 'Crispy', desc: 'Puri for pani puri on a basket (Suji Ke Golgappe).', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 608, name: 'Pani Puri / Golgappe', category: 'Chaats & Snacks', price: '₹79', rating: 4.9, tag: 'Best Seller', desc: 'Pani puri recipe served with flavored mint water and potato chickpea filling.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 609, name: 'Dahi Vada', category: 'Chaats & Snacks', price: '₹119', rating: 4.8, tag: 'Cooling', desc: 'Top shot of assembled dahi vada topped with white curd, tamarind chutney, green coriander chutney, and pomegranate arils.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 610, name: 'Matar Kachori', category: 'Chaats & Snacks', price: '₹59', rating: 4.5, tag: 'Spicy', desc: 'Matar kachori garnished with coriander leaves and served with chutney in a small bowl.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 611, name: 'Aloo Kulcha', category: 'Sides', price: '₹89', rating: 4.6, tag: 'Freshly Baked', desc: 'Soft and delicious aloo kulcha served in a plate with butter.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 612, name: 'Kacchi Dabeli', category: 'Chaats & Snacks', price: '₹79', rating: 4.7, tag: 'Gujarat Special', desc: 'Side shot of dabeli served on a white plate with garnished kept in white bowls on the upper side.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 613, name: 'Tawa Pulao', category: 'Chaats & Snacks', price: '₹159', rating: 4.7, tag: 'Mumbai Style', desc: 'Tawa pulao served in a white plate with a spoon kept in the right side on the plate.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 614, name: 'Misal Pav', category: 'Chaats & Snacks', price: '₹129', rating: 4.8, tag: 'Spicy Delight', desc: 'Misal pav served in a plate topped with farsan with a side of sliced lemons, chopped onions and pav.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 615, name: 'Bhel Puri', category: 'Chaats & Snacks', price: '₹89', rating: 4.7, tag: 'Tangy', desc: 'Bhel puri served with a side of crisp baked puri in a red rimmed white bowl.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 616, name: 'Aloo Tikki', category: 'Chaats & Snacks', price: '₹79', rating: 4.6, tag: 'Crispy', desc: 'Three aloo tikki kept vertically on a white plate with a spoon and a splash of cilantro dip.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 617, name: 'Ragda Patties', category: 'Chaats & Snacks', price: '₹119', rating: 4.8, tag: 'Street Choice', desc: 'Ragda patties served on a white bowl with a spoon, rich in spices and flavors.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 618, name: 'Dal Vada (Parippu Vada)', category: 'South Indian', price: '₹79', rating: 4.7, tag: 'Crispy Fritters', desc: 'Dal vada arranged neatly on a white plate next to a small white bowl of red chutney.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 619, name: 'Vada Pav', category: 'Chaats & Snacks', price: '₹49', rating: 4.9, tag: 'Legendary', desc: 'Vada pav served with salted green chilies, dry garlic chutney and green chutney on a white plate.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 620, name: 'Matar Kulcha (Matar Chaat)', category: 'Chaats & Snacks', price: '₹119', rating: 4.8, tag: 'Delhi Special', desc: 'Matar Kulcha served with tangy Delhi style Matar Chaat.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 621, name: 'Puri Bhaji', category: 'South Indian', price: '₹119', rating: 4.7, tag: 'Hearty Meal', desc: 'Puri bhaji served as a complete thali meal with batata bhaji.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 622, name: 'Batata Vada', category: 'Chaats & Snacks', price: '₹59', rating: 4.6, tag: 'Spicy', desc: 'Batata vada served on a white plate with a side of green chilies.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 623, name: 'Khasta Kachori (Moong Dal)', category: 'Chaats & Snacks', price: '₹69', rating: 4.7, tag: 'Crunchy', desc: 'Four kachori in an oval tray with a few fried green chillies on top.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 624, name: 'Papdi Chaat', category: 'Chaats & Snacks', price: '₹99', rating: 4.8, tag: 'Classic', desc: 'Overhead shot of papdi chaat in a white shallow bowl with a side of papdi.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 625, name: 'Masala Puri', category: 'Chaats & Snacks', price: '₹89', rating: 4.7, tag: 'Bangalore Style', desc: 'Masala puri served in a white bowl with a spoon (Bangalore Street Style Chaat).', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 626, name: 'Koraishutir Kochuri', category: 'Chaats & Snacks', price: '₹119', rating: 4.8, tag: 'Bengali Special', desc: 'Koraishutir kochuri served on a white plate with a bowl of cholar dal.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 627, name: 'Dahi Bhalla', category: 'Chaats & Snacks', price: '₹119', rating: 4.8, tag: 'Cool & Tangy', desc: 'Dahi bhalla served on a white plate with spices and sweet yogurt.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 628, name: 'Ragda Special', category: 'Chaats & Snacks', price: '₹99', rating: 4.6, tag: 'Hot', desc: 'Overhead shot of ragda with a mint sprig in the center filled in a blue rimmed white bowl.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 629, name: 'Litti Chokha', category: 'Chaats & Snacks', price: '₹179', rating: 4.9, tag: 'Bihar Special', desc: 'Traditional litti chokha served in glass bowls with pure ghee.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 630, name: 'Sev Puri', category: 'Chaats & Snacks', price: '₹99', rating: 4.8, tag: 'Mumbai Style', desc: 'Overhead shot of sev puri on a dark purple plate on a dark blue table.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 631, name: 'Masala Pav', category: 'Chaats & Snacks', price: '₹89', rating: 4.7, tag: 'Buttery', desc: 'Masala pav garnished with chopped onions, coriander leaves and served with lemon wedges.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 632, name: 'Mysore Bonda (Mysore Bajji)', category: 'South Indian', price: '₹89', rating: 4.7, tag: 'Soft & Fluffy', desc: 'Overhead shot of white plate having halved mysore bonda showing the fluffy texture.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 633, name: 'Instant Pot Pav Bhaji', category: 'Chaats & Snacks', price: '₹159', rating: 4.8, tag: 'Modern Style', desc: 'Delicious instant pot pav bhaji cooked to perfection with loaded butter.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 634, name: 'Aloo Bonda', category: 'South Indian', price: '₹79', rating: 4.6, tag: 'Crispy', desc: 'Aloo bonda on a white plate served with a side of green chutney.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 635, name: 'Aloo Tikki Chole', category: 'Chaats & Snacks', price: '₹129', rating: 4.8, tag: 'Flavor Burst', desc: 'Aloo tikki chole served in a white plate with hot chole gravy, chutneys and chopped onions.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 636, name: 'Punugulu', category: 'South Indian', price: '₹89', rating: 4.7, tag: 'Crispy Snack', desc: 'Crispy snack prepared with fermented idli dosa batter.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 637, name: 'Rava Dosa (Quick & Crispy)', category: 'South Indian', price: '₹139', rating: 4.8, tag: 'Crispy', desc: 'Rava dosa served in a green plate with a side of two bowls having sambar and coconut chutney.', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 638, name: 'Traditional Dosa', category: 'South Indian', price: '₹119', rating: 4.9, tag: 'Classic', desc: 'Two folded, golden, crisp dosas next to white bowls of sambar and chutney.', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 639, name: 'Dahi Puri', category: 'Chaats & Snacks', price: '₹89', rating: 4.8, tag: 'Mumbai Style', desc: 'Overhead shot of dahi puri in two plates on a beige cotton napkin.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 640, name: 'Urad Dal Kachori', category: 'Chaats & Snacks', price: '₹79', rating: 4.6, tag: 'Urad Special', desc: 'Urad dal kachori served on a white platter with a bowl of aloo rasedar on the left side.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 641, name: 'Maddur Vada', category: 'South Indian', price: '₹69', rating: 4.7, tag: 'Karnataka Special', desc: 'Maddur vada placed on a banana leaf kept on a serving plate with a side of coconut chutney.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 642, name: 'Goli Baje (Mangalore Bajji)', category: 'South Indian', price: '₹79', rating: 4.8, tag: 'Mangalore Classic', desc: 'Goli baje served on a green plate lined with banana leaf and a bowl of coconut chutney.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 643, name: 'Ram Laddu (Delhi Street Food)', category: 'Chaats & Snacks', price: '₹69', rating: 4.7, tag: 'Crispy Fritters', desc: 'Ram laddu topped with green chutney, grated radish-coriander leaves and served in individual small bowls.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 644, name: 'Khada Pav Bhaji', category: 'Chaats & Snacks', price: '₹159', rating: 4.8, tag: 'Chunky Mash', desc: 'Khada pav bhaji served in a plate with sides of pav and chopped onions, lemon wedges.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 645, name: 'Bedmi Puri (Delhi Style)', category: 'South Indian', price: '₹129', rating: 4.7, tag: 'Spicy Poori', desc: 'Bedmi puri on white plate with chana aloo gravy (sabzi) placed in a white bowl.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 646, name: 'Paneer Pav Bhaji', category: 'Chaats & Snacks', price: '₹169', rating: 4.9, tag: 'Rich & Creamy', desc: 'Paneer pav bhaji served with buttered pav and lemon wedge on a white plate.', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 669, name: 'Katori Chaat (Tokri Chaat)', category: 'Chaats & Snacks', price: '₹119', rating: 4.8, tag: 'Royal Chaat', desc: 'Crispy deep-fried baskets (katoris) filled with sprouts, potatoes, yogurt and chutneys.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 670, name: 'Raj Kachori', category: 'Chaats & Snacks', price: '₹149', rating: 4.9, tag: 'King of Chaats', desc: 'Large crispy kachori stuffed with rich fillings, curd, chutneys and sev.', image: 'https://images.unsplash.com/photo-1605333396915-47ed6b68a00e?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 671, name: 'Delhi Style Golgappa', category: 'Chaats & Snacks', price: '₹79', rating: 4.8, tag: 'Classic street food', desc: 'Golgappa assembled and served with spicy and sour mint coriander water.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 672, name: 'Aloo Chaat', category: 'Chaats & Snacks', price: '₹89', rating: 4.7, tag: 'Street Style', desc: 'Aloo chaat served in an eco-friendly bowl made from areca palm.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 673, name: 'Ragda Chaat', category: 'Chaats & Snacks', price: '₹99', rating: 4.7, tag: 'Spicy', desc: 'Ragda chaat served with 2 crispy papdis on a white platter.', image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 674, name: 'Dahi ke Sholay', category: 'Chaats & Snacks', price: '₹139', rating: 4.8, tag: 'Crunchy Roll', desc: 'Crispy bread pockets stuffed with thick spiced yogurt and bell peppers.', image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 675, name: 'Samosa Pav', category: 'Chaats & Snacks', price: '₹59', rating: 4.7, tag: 'Mumbai Favorite', desc: 'Samosa stuffed inside a soft pav roll with spicy dry garlic powder chutney.', image: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 676, name: 'Beguni (Eggplant Fritters)', category: 'Chaats & Snacks', price: '₹59', rating: 4.6, tag: 'Bengali Special', desc: 'Crispy fried sliced eggplants dipped in gram flour batter.', image: 'https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=300&q=80', isVeg: true },
    { id: 677, name: 'Pav Bhaji Dosa', category: 'South Indian', price: '₹149', rating: 4.8, tag: 'Fusion Special', desc: 'Crispy dosa filled with buttery street style Pav Bhaji masala.', image: 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=300&q=80', isVeg: true }
  ]
};

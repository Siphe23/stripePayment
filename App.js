import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import bookImage from './path/book.jpg'; // Update the path accordingly

const App = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "1",
      name: "Faux Fur Orthopedic Dog Bed",
      price: 95,
      quantity: 1,
      image: bookImage, 
    },
  ]);

  const updateQuantity = (id, action) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: action === "increase" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = 20; // Example discount in Rands
  const total = subtotal - discount;

  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>R{item.price.toFixed(2)}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, "decrease")} style={styles.button}>
            <Text>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, "increase")} style={styles.button}>
            <Text>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.outerContainer}>
      <View style={styles.card}>
        <Text style={styles.header}>Your Shopping Cart</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
        />
        <View style={styles.summary}>
          <View style={styles.row}>
            <Text>Subtotal</Text>
            <Text>R{subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Discount</Text>
            <Text>-R{discount.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Total</Text>
            <Text>R{total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>CHECKOUT</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "90%",
    maxWidth: 400,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 15,
    alignItems: "center",
  },
  image: {
    width: 150, // Increased size
    height: 150, // Increased size
    borderRadius: 5,
    marginRight: 10,
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  itemPrice: {
    color: "gray",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  button: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 14,
  },
  summary: {
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  checkoutButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  checkoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default App;

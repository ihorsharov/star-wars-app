import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getNormalizedGender } from "~/utils/getNormalizedGender";
import { RootState } from "~/redux/store/store";
import { GenderCounterState } from "~/redux/slices/genderSlice";

const GenderCounter = () => {
  const counter = useSelector((state: RootState) => state.genderCounter);

  const Card = ({ counter, gender }: { counter: number; gender: string }) => {
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>{gender}</Text>
        <Text style={styles.counterText}>{`Fans: ${counter}`}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {Object.keys(counter).map((gender) => (
        <Card
          key={gender}
          gender={getNormalizedGender(gender)}
          counter={counter[gender as keyof GenderCounterState]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  genderText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  counterButton: {
    fontSize: 20,
    marginHorizontal: 10,
  },
  resetButton: {
    fontSize: 16,
    color: "red",
    marginTop: 5,
  },
  card: {
    width: "33%",
    maxWidth: "33%",
    backgroundColor: "#e0e0e0",
    padding: 20,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  counterText: {
    fontSize: 16,
  },
});

export default GenderCounter;

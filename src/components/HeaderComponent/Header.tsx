import { FC } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { resetCounters } from "~/redux/slices/genderSlice";

interface IProps {
  setPressedItems: React.Dispatch<
    React.SetStateAction<Record<string, boolean>>
  >;
}
const Header: FC<IProps> = ({ setPressedItems }) => {
  const dispatch = useDispatch();

  const handleClearFans = () => {
    dispatch(resetCounters());
    setPressedItems({});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Fans</Text>
      <TouchableOpacity style={styles.button} onPress={handleClearFans}>
        <Text style={styles.buttonText}>Clear fans</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "10%",
  },
  button: {
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "bold",
  },
  buttonText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});
export default Header;

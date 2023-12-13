import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Button,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from "react-native";
import { fetchPeople } from "~/redux/thunks/peopleThunk";
import { AppDispatch, RootState } from "~/redux/store/store";
import { ScreenWrapper } from "~/components/Wrapper/ScreenWrapper/ScreenWrapper";
import SvgUri from "react-native-svg-uri";
import GenderCounter from "~/components/GenderCounter/GenderCounter";
import { decrementCounter, incrementCounter } from "~/redux/slices/genderSlice";
import Header from "~/components/HeaderComponent/Header";
import { Character } from "~/redux/slices/peopleSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "App";

const MainScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, "Main">;
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const peopleResults = useSelector((state: RootState) => state.people.results);
  const status = useSelector((state: RootState) => state.people.status);
  const currentPage = useSelector(
    (state: RootState) => state.people.currentPage
  );
  const totalPages = useSelector((state: RootState) => state.people.totalPages);

  const [isLoading, setIsLoading] = useState(false);
  const [pressedItems, setPressedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPeople(currentPage));
    }
  }, [dispatch, status, currentPage]);

  useEffect(() => {
    if (status === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [status]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(fetchPeople(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(fetchPeople(currentPage + 1));
    }
  };

  const handleToggleHeart = (gender: string, id: string) => {
    if (pressedItems[id]) {
      dispatch(decrementCounter(gender));
    } else {
      dispatch(incrementCounter(gender));
    }
    setPressedItems((prevItems) => ({
      ...prevItems,
      [id]: !prevItems[id],
    }));
  };

  const renderItem = ({ item }: { item: Character }) => {
    const gender = item.gender;
    const id = item.name;
    const isPressed = pressedItems[id] || false;

    return (
      <View key={item.name} style={styles.characterContainer}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => handleToggleHeart(gender, id)}
        >
          <SvgUri
            width={20}
            height={20}
            source={
              isPressed
                ? require("~/assets/red-heart.svg")
                : require("~/assets/empty-heart.svg")
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.character}
          onPress={() =>
            // @ts-ignore
            navigation.navigate("Details", {
              item,
            })
          }
        >
          <View style={{ flex: 1 }}>
            <Text>{item.name}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{item.gender}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScreenWrapper paddingLeft={10} paddingRight={10}>
      <ScrollView>
        <Header setPressedItems={setPressedItems} />
        <GenderCounter />
        <View style={styles.container}>
          <View style={styles.tableContainer}>
            <View style={styles.characterContainer}>
              <View style={{ flex: 1 }}>
                <SvgUri
                  width={20}
                  height={20}
                  source={require("~/assets/heart.svg")}
                />
              </View>
              <View style={styles.character}>
                <View style={{ flex: 1 }}>
                  <Text>Name</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>Gender</Text>
                </View>
              </View>
            </View>
            <FlatList
              scrollEnabled={false}
              data={peopleResults}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.paginationContainer}>
            <Button
              title="Prev. Page"
              onPress={handlePreviousPage}
              disabled={isLoading || currentPage === 1}
            />
            <Text>{`Page ${currentPage} of ${totalPages}`}</Text>
            <Button
              title="Next Page"
              onPress={handleNextPage}
              disabled={isLoading || currentPage === totalPages}
            />
          </View>
        </View>
      </ScrollView>
      {isLoading && (
        <View style={styles.loaderOverlay}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tableContainer: {
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  characterContainer: {
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "3%",
    paddingVertical: "5%",
  },
  character: {
    flex: 4,
    flexDirection: "row",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: "5%",
    paddingBottom: "15%",
  },
  loaderOverlay: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainScreen;

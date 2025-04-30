import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import Colors from '../shared/Colors';
import { HugeiconsIcon } from '@hugeicons/react-native';
import { CheckmarkSquare02Icon, SquareIcon } from '@hugeicons/core-free-icons';
import { useMutation } from 'convex/react';
import { api } from '../convex/_generated/api';
import { RefreshDataContext } from '../context/RefreshDataContext';

export default function MealPlanCard({ mealPlanInfo }) {
  const updateStatus = useMutation(api.MealPlan.updateStatus);
  const refreshContext = useContext(RefreshDataContext);
  const setRefreshData = refreshContext?.setRefreshData;
  // ⬇️ Local state to reflect status change immediately
  const [checked, setChecked] = useState(mealPlanInfo?.mealPlan?.status === true);

  const onCheck = async (status) => {
    try {
      await updateStatus({
        id: mealPlanInfo?.mealPlan?._id,
        status: status,
        calories: mealPlanInfo?.recipe?.jsonData?.calories,
      });
      setChecked(status); // ✅ Update local state
     
        setRefreshData(Date.now());
      
      Alert.alert('Great!', status ? 'Added' : 'Removed');
    } catch (error) {
      console.error('Status update failed', error);
    }
  };

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: mealPlanInfo?.recipe?.imageUrl }}
        style={styles.image}
      />
      <View style={styles.infoRow}>
        <View>
          <Text style={styles.mealTypeText}>{mealPlanInfo?.mealPlan?.mealType}</Text>
          <Text style={styles.recipeName}>{mealPlanInfo?.recipe?.recipeName}</Text>
          <Text style={styles.calories}>{mealPlanInfo?.recipe?.jsonData?.calories} kcal</Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => onCheck(!checked)}>
            <HugeiconsIcon
              icon={checked ? CheckmarkSquare02Icon : SquareIcon}
              color={checked ? '#5BA701' : Colors.GREY}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 15,
  },
  infoRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  mealTypeText: {
    backgroundColor: '#ebf6eb',
    color: Colors.BLACK,
    padding: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexWrap: 'wrap',
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  calories: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
    color: '#388E3C',
  },
});

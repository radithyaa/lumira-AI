import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { ChevronLeft, ChevronDown } from 'lucide-react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

type DurationType = 'weekly' | 'monthly' | 'yearly';

// Dummy data untuk chart berdasarkan durasi
const CHART_DATA = {
  weekly: {
    labels: ['15', '16', '17', '18', '19', '20', '21'],
    datasets: [{
      data: [5, 7, 4, 5, 6.5, 8, 0.5],
    }],
    focusTime: '40 hr',
    avgFocusTime: '5.2 hr',
    sessions: 67,
  },
  monthly: {
    labels: ['W1', 'W2', 'W3', 'W4'],
    datasets: [{
      data: [25, 30, 28, 32],
    }],
    focusTime: '115 hr',
    avgFocusTime: '28.8 hr',
    sessions: 245,
  },
  yearly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      data: [120, 135, 125, 140, 138, 145],
    }],
    focusTime: '803 hr',
    avgFocusTime: '133.8 hr',
    sessions: 1456,
  },
};

// Dummy heatmap data
const HEATMAP_HOURS = ['6 AM', '9 AM', '12 AM', '3 PM', '5 PM', '7 PM'];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const HEATMAP_COLORS = ['#FFECD4', '#FFD5A8', '#FFB771', '#FF8225'];

const generateHeatmapData = () => {
  const data = [];
  for (let i = 0; i < 7; i++) {
    const row = [];
    for (let j = 0; j < 10; j++) {
      row.push(Math.floor(Math.random() * 4));
    }
    data.push(row);
  }
  return data;
};

export default function ReportPage() {
  const router = useRouter();
  const [duration, setDuration] = useState<DurationType>('weekly');
  const [showDurationMenu, setShowDurationMenu] = useState(false);
  const [heatmapDuration, setHeatmapDuration] = useState<'monthly' | 'yearly'>('monthly');
  const [showHeatmapMenu, setShowHeatmapMenu] = useState(false);
  const [heatmapData] = useState(generateHeatmapData());

  const currentData = CHART_DATA[duration];

  const chartConfig = {
    backgroundColor: '#ffffff',
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(255, 130, 37, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(126, 126, 126, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForBackgroundLines: {
      strokeDasharray: '',
      stroke: '#E5E5E5',
      strokeWidth: 1,
    },
    fillShadowGradient: '#FFD5A8',
    fillShadowGradientOpacity: 1,
  };

  return (
    <ScrollView className="flex-1 bg-[#FFF3E9]">
      <View className="px-5 pt-14 pb-6">
        {/* Header */}
        <View className="flex-row items-center justify-center mb-6 relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="absolute left-0"
          >
            <Icon as={ChevronLeft} size={26} color="#141B34" />
          </TouchableOpacity>
          <Text className="text-xl font-['Poppins-Medium'] text-black">Report</Text>
        </View>

        {/* Focus Time Chart */}
        <View className="bg-white rounded-2xl p-4 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-['Poppins-Medium'] text-[#131313]">
              Focus Time
            </Text>
            <TouchableOpacity
              onPress={() => setShowDurationMenu(!showDurationMenu)}
              className="px-3 py-1.5 bg-white rounded-full shadow-sm flex-row items-center"
            >
              <Text className="text-sm font-['Poppins-Regular'] text-[#131313] mr-1">
                {duration === 'weekly' ? 'Weekly' : duration === 'monthly' ? 'Monthly' : 'Yearly'}
              </Text>
              <Icon as={ChevronDown} size={16} color="#131313" />
            </TouchableOpacity>
          </View>

          {showDurationMenu && (
            <View className="absolute right-4 top-16 bg-white rounded-xl shadow-lg z-10 p-2">
              {(['weekly', 'monthly', 'yearly'] as DurationType[]).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setDuration(type);
                    setShowDurationMenu(false);
                  }}
                  className="px-4 py-2"
                >
                  <Text className="text-sm font-['Poppins-Regular'] text-[#131313] capitalize">
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Stats */}
          <View className="flex-row justify-between mb-4">
            <View className="items-center">
              <Text className="text-sm font-['Poppins-Regular'] text-[#7E7E7E] mb-1">
                Focus Time
              </Text>
              <Text className="text-xl font-['Poppins-Medium'] text-[#131313]">
                {currentData.focusTime}
              </Text>
            </View>
            <View className="w-px h-12 bg-[#7E7E7E] opacity-40" />
            <View className="items-center">
              <Text className="text-sm font-['Poppins-Regular'] text-[#7E7E7E] mb-1">
                Avg Focus Time
              </Text>
              <Text className="text-xl font-['Poppins-Medium'] text-[#131313]">
                {currentData.avgFocusTime}
              </Text>
            </View>
            <View className="w-px h-12 bg-[#7E7E7E] opacity-40" />
            <View className="items-center">
              <Text className="text-sm font-['Poppins-Regular'] text-[#7E7E7E] mb-1">
                Sessions
              </Text>
              <Text className="text-xl font-['Poppins-Medium'] text-[#131313]">
                {currentData.sessions}
              </Text>
            </View>
          </View>

          {/* Chart */}
          <BarChart
            data={currentData}
            width={screenWidth - 72}
            height={220}
            chartConfig={chartConfig}
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            showValuesOnTopOfBars={false}
            fromZero
            yAxisSuffix="h"
          />
        </View>

        {/* Heatmap */}
        <View className="bg-white rounded-2xl p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-['Poppins-Medium'] text-[#131313]">
              Heatmap
            </Text>
            <TouchableOpacity
              onPress={() => setShowHeatmapMenu(!showHeatmapMenu)}
              className="px-3 py-1.5 bg-white rounded-full shadow-sm flex-row items-center"
            >
              <Text className="text-sm font-['Poppins-Regular'] text-[#131313] mr-1">
                {heatmapDuration === 'monthly' ? 'Monthly' : 'Yearly'}
              </Text>
              <Icon as={ChevronDown} size={16} color="#131313" />
            </TouchableOpacity>
          </View>

          {showHeatmapMenu && (
            <View className="absolute right-4 top-16 bg-white rounded-xl shadow-lg z-10 p-2">
              {(['monthly', 'yearly'] as const).map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setHeatmapDuration(type);
                    setShowHeatmapMenu(false);
                  }}
                  className="px-4 py-2"
                >
                  <Text className="text-sm font-['Poppins-Regular'] text-[#131313] capitalize">
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Productive hours legend */}
          <View className="mb-4">
            <Text className="text-sm font-['Poppins-Regular'] text-[#7E7E7E] mb-2">
              Productive hours
            </Text>
            <View className="flex-row gap-1">
              {HEATMAP_COLORS.map((color, index) => (
                <View
                  key={index}
                  className="w-6 h-6 rounded"
                  style={{ backgroundColor: color }}
                />
              ))}
            </View>
          </View>

          {/* Heatmap chart */}
          <View className="mb-2">
            <Text className="text-sm font-['Poppins-Regular'] text-[#7E7E7E] mb-3">
              Heatmap chart
            </Text>
            
            {/* Hour labels */}
            <View className="flex-row mb-2 ml-10">
              {HEATMAP_HOURS.map((hour, index) => (
                <Text
                  key={index}
                  className="text-xs font-['Poppins-Medium'] text-[#7E7E7E] flex-1 text-center"
                >
                  {hour}
                </Text>
              ))}
            </View>

            {/* Heatmap grid */}
            {DAYS.map((day, dayIndex) => (
              <View key={dayIndex} className="flex-row items-center mb-1">
                <Text className="text-sm font-['Poppins-Medium'] text-[#7E7E7E] w-10">
                  {day}
                </Text>
                <View className="flex-row gap-1 flex-1">
                  {heatmapData[dayIndex].map((intensity, hourIndex) => (
                    <View
                      key={hourIndex}
                      className="w-6 h-6 rounded"
                      style={{ backgroundColor: HEATMAP_COLORS[intensity] }}
                    />
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

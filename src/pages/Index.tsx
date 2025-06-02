
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Leaf, Car, Zap, Plane, Beef, Milk, Carrot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CarbonData {
  carTravel: number;
  electricity: number;
  flights: number;
  meatIntake: number;
  dairyIntake: number;
  plantIntake: number;
}

const Index = () => {
  const [data, setData] = useState<CarbonData>({
    carTravel: 0,
    electricity: 0,
    flights: 0,
    meatIntake: 0,
    dairyIntake: 0,
    plantIntake: 0
  });
  
  const [totalFootprint, setTotalFootprint] = useState<number | null>(null);
  const { toast } = useToast();

  const calculateFootprint = () => {
    // Carbon emission factors (kg CO2 equivalent)
    const carEmissionFactor = 0.21; // kg CO2 per km
    const electricityEmissionFactor = 0.5; // kg CO2 per kWh
    const flightEmissionFactor = 90; // kg CO2 per hour
    const meatEmissionFactor = 0.027; // kg CO2 per gram
    const dairyEmissionFactor = 0.0033; // kg CO2 per gram
    const plantEmissionFactor = 0.002; // kg CO2 per gram

    const carFootprint = data.carTravel * carEmissionFactor;
    const electricityFootprint = data.electricity * electricityEmissionFactor;
    const flightFootprint = data.flights * flightEmissionFactor;
    const meatFootprint = data.meatIntake * meatEmissionFactor;
    const dairyFootprint = data.dairyIntake * dairyEmissionFactor;
    const plantFootprint = data.plantIntake * plantEmissionFactor;

    const total = carFootprint + electricityFootprint + flightFootprint + 
                 meatFootprint + dairyFootprint + plantFootprint;
    
    setTotalFootprint(total);
    
    toast({
      title: "Carbon Footprint Calculated!",
      description: `Your daily carbon footprint is ${total.toFixed(2)} kg CO2`,
    });
  };

  const updateData = (field: keyof CarbonData, value: string) => {
    setData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const getFootprintCategory = (footprint: number) => {
    if (footprint < 10) return { category: "Excellent", color: "bg-green-500", description: "Very low carbon footprint!" };
    if (footprint < 20) return { category: "Good", color: "bg-yellow-500", description: "Below average carbon footprint" };
    if (footprint < 30) return { category: "Average", color: "bg-orange-500", description: "Average carbon footprint" };
    return { category: "High", color: "bg-red-500", description: "Consider reducing your carbon footprint" };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="h-12 w-12 text-green-600" />
            <h1 className="text-4xl font-bold text-green-800">
              Daily Carbon Footprint Tracker
            </h1>
          </div>
          <p className="text-green-600 text-lg max-w-2xl mx-auto">
            Track your daily activities and discover your environmental impact. 
            Small changes can make a big difference for our planet.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Leaf className="h-6 w-6" />
                Carbon Footprint Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="carTravel" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <Car className="h-5 w-5 text-blue-600" />
                      Car travel (km):
                    </Label>
                    <Input
                      id="carTravel"
                      type="number"
                      placeholder="e.g., 25"
                      value={data.carTravel || ''}
                      onChange={(e) => updateData('carTravel', e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-green-400 rounded-lg transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="electricity" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-600" />
                      Electricity usage (kWh):
                    </Label>
                    <Input
                      id="electricity"
                      type="number"
                      placeholder="e.g., 15"
                      value={data.electricity || ''}
                      onChange={(e) => updateData('electricity', e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-green-400 rounded-lg transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="flights" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <Plane className="h-5 w-5 text-sky-600" />
                      Flights (hours):
                    </Label>
                    <Input
                      id="flights"
                      type="number"
                      placeholder="e.g., 2"
                      value={data.flights || ''}
                      onChange={(e) => updateData('flights', e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-green-400 rounded-lg transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-3">
                    <Label htmlFor="meatIntake" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <Beef className="h-5 w-5 text-red-600" />
                      Meat Intake (grams):
                    </Label>
                    <Input
                      id="meatIntake"
                      type="number"
                      placeholder="e.g., 200"
                      value={data.meatIntake || ''}
                      onChange={(e) => updateData('meatIntake', e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-green-400 rounded-lg transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="dairyIntake" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <Milk className="h-5 w-5 text-blue-400" />
                      Dairy Intake (grams):
                    </Label>
                    <Input
                      id="dairyIntake"
                      type="number"
                      placeholder="e.g., 300"
                      value={data.dairyIntake || ''}
                      onChange={(e) => updateData('dairyIntake', e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-green-400 rounded-lg transition-colors"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="plantIntake" className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      <Carrot className="h-5 w-5 text-orange-600" />
                      Plant-based Intake (grams):
                    </Label>
                    <Input
                      id="plantIntake"
                      type="number"
                      placeholder="e.g., 500"
                      value={data.plantIntake || ''}
                      onChange={(e) => updateData('plantIntake', e.target.value)}
                      className="text-lg p-4 border-2 border-gray-200 focus:border-green-400 rounded-lg transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  onClick={calculateFootprint}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Calculate Carbon Footprint
                </Button>
              </div>

              {totalFootprint !== null && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-200">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-800 mb-4">Your Daily Carbon Footprint</h3>
                    <div className="text-4xl font-bold text-green-900 mb-4">
                      {totalFootprint.toFixed(2)} kg CO₂
                    </div>
                    <Badge className={`${getFootprintCategory(totalFootprint).color} text-white px-4 py-2 text-lg`}>
                      {getFootprintCategory(totalFootprint).category}
                    </Badge>
                    <p className="text-green-700 mt-2 text-lg">
                      {getFootprintCategory(totalFootprint).description}
                    </p>
                    <div className="mt-4 text-sm text-green-600">
                      <p>💡 <strong>Tip:</strong> The average daily carbon footprint globally is about 16 kg CO₂</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Car className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg text-gray-800">Transportation</h3>
                <p className="text-gray-600 text-sm mt-2">Consider walking, cycling, or public transport</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg text-gray-800">Energy Usage</h3>
                <p className="text-gray-600 text-sm mt-2">Switch to renewable energy sources</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <Carrot className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h3 className="font-bold text-lg text-gray-800">Diet Choices</h3>
                <p className="text-gray-600 text-sm mt-2">More plants, less meat makes a difference</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;


import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  LineChart,
  PieChart,
  AreaChart,
  Scatter,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Bar,
  Line,
  Area,
  Pie,
  Cell,
} from "recharts";
import { Download, BarChart2, LineChart as LineIcon, PieChart as PieIcon } from "lucide-react";

// Mock data for visualization
const mockData = [
  { name: "Norte", value: 11275 },
  { name: "Sur", value: 9000 },
  { name: "Este", value: 10250 },
  { name: "Oeste", value: 8025 },
];

const mockTimeData = [
  { name: "Día 1", Norte: 10500, Sur: 8200, Este: 9000, Oeste: 7500 },
  { name: "Día 2", Norte: 10800, Sur: 8600, Este: 9300, Oeste: 7150 },
  { name: "Día 3", Norte: 12050, Sur: 9800, Este: 10200, Oeste: 8100 },
  { name: "Día 4", Norte: 11700, Sur: 9400, Este: 11200, Oeste: 8900 },
];

const mockCategoryData = [
  { name: "Electrónica", value: 9400 },
  { name: "Hogar", value: 9325 },
  { name: "Ropa", value: 9175 },
];

// Colors for charts
const COLORS = [
  "#8884d8", 
  "#82ca9d", 
  "#ffc658", 
  "#ff8042", 
  "#0088FE", 
  "#00C49F"
];

interface DataVisualizerProps {
  datasetName?: string;
}

const DataVisualizer = ({ datasetName }: DataVisualizerProps) => {
  const [activeTab, setActiveTab] = useState("bar");

  return (
    <Card className="border shadow-sm">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Visualizaciones</CardTitle>
            <CardDescription>
              {datasetName
                ? `Visualizaciones generadas para ${datasetName}`
                : "Visualizaciones recomendadas por la IA"}
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="bar" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="bar" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span>Ventas por región</span>
            </TabsTrigger>
            <TabsTrigger value="line" className="flex items-center gap-1">
              <LineIcon className="h-4 w-4" />
              <span>Tendencia temporal</span>
            </TabsTrigger>
            <TabsTrigger value="pie" className="flex items-center gap-1">
              <PieIcon className="h-4 w-4" />
              <span>Distribución por categoría</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="bar" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={mockData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis label={{ value: 'Ventas (€)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value} €`, "Ventas"]} />
                <Legend />
                <Bar dataKey="value" name="Ventas por región" fill="#8884d8">
                  {mockData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="line" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockTimeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                <YAxis label={{ value: 'Ventas (€)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value} €`, "Ventas"]} />
                <Legend />
                <Line type="monotone" dataKey="Norte" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Sur" stroke="#82ca9d" />
                <Line type="monotone" dataKey="Este" stroke="#ffc658" />
                <Line type="monotone" dataKey="Oeste" stroke="#ff8042" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          
          <TabsContent value="pie" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                >
                  {mockCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value} €`, "Ventas promedio"]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-medium">Insights generados por IA</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Ventas por región
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  La región Norte tiene un 24% más de ventas que la región Oeste, siendo
                  la región con mejor rendimiento en el dataset. La región Este muestra
                  el mayor crecimiento (+20%) entre el día 1 y día 4.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Tendencia temporal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Se observa un incremento general en ventas del 18% entre los días 1-2 y
                  los días 3-4. Todas las regiones muestran una tendencia creciente, con
                  la mayor volatilidad en la región Este.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Análisis por categoría
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  La categoría "Electrónica" tiene las ventas promedio más altas (9,400€),
                  seguida por "Hogar" (9,325€) y "Ropa" (9,175€). La diferencia entre 
                  categorías es menor al 3%, sugiriendo un rendimiento balanceado.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">
                  Correlaciones identificadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Existe una fuerte correlación entre unidades vendidas y el total de
                  ventas (r=0.82). La región Norte tiene la mayor correlación entre
                  unidades y ventas (r=0.94), sugiriendo precios más consistentes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataVisualizer;

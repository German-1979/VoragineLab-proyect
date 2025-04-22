
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import FileUpload from "@/components/FileUpload";
import { DataTable } from "@/components/DataTable";
import AIChat from "@/components/AIChat";
import DataVisualizer from "@/components/DataVisualizer";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createColumnHelper } from "@tanstack/react-table";

interface DatasetInfo {
  columns: string[];
  rows: Record<string, any>[];
  fileName: string;
  fileSize: number;
  dateUploaded: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const [dataset, setDataset] = useState<DatasetInfo | null>(null);
  const [hasData, setHasData] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("voragine-user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    
    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    } catch (e) {
      localStorage.removeItem("voragine-user");
      navigate("/login");
    }
  }, [navigate]);

  const handleFileLoaded = (data: DatasetInfo) => {
    setDataset(data);
    setHasData(true);
  };

  const resetData = () => {
    setDataset(null);
    setHasData(false);
    toast({
      title: "Datos eliminados",
      description: "El dataset ha sido eliminado correctamente",
    });
  };

  const generateReactTableColumns = (data: DatasetInfo) => {
    const columnHelper = createColumnHelper<Record<string, any>>();
    
    return data.columns.map((column) => 
      columnHelper.accessor(column, {
        header: column,
        cell: (info) => {
          const value = info.getValue();
          // Format numbers
          if (typeof value === 'number') {
            return new Intl.NumberFormat('es-ES').format(value);
          }
          return value;
        },
      })
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar user={user} />
      
      <main className="flex-1 container mx-auto p-4 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          
          {hasData && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Nuevo análisis
              </Button>
              <Button size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar análisis
              </Button>
            </div>
          )}
        </div>
        
        {!hasData ? (
          <div className="grid place-items-center py-12">
            <div className="max-w-3xl w-full">
              <h2 className="text-2xl font-semibold text-center mb-6">
                Sube un archivo para comenzar
              </h2>
              <FileUpload onFileLoaded={handleFileLoaded} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {dataset && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <DataTable 
                      data={dataset.rows} 
                      columns={generateReactTableColumns(dataset)}
                      fileName={dataset.fileName}
                    />
                  </div>
                  <div className="h-[600px]">
                    <AIChat datasetName={dataset.fileName} />
                  </div>
                </div>
                
                <DataVisualizer datasetName={dataset.fileName} />
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;

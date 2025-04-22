
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, FileSpreadsheet, BarChart3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileLoaded: (data: any) => void;
}

const FileUpload = ({ onFileLoaded }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    const allowedTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Tipo de archivo no soportado",
        description: "Por favor sube un archivo CSV o Excel (.xlsx)"
      });
      return;
    }

    setFile(file);
    setIsLoading(true);
    
    // Simulate file processing
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 10;
      if (currentProgress > 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Simulate data extraction
        setTimeout(() => {
          // Mock CSV data structure
          const mockData = {
            columns: ["Fecha", "Región", "Ventas", "Unidades", "Categoría"],
            rows: [
              { Fecha: "2023-01-01", Región: "Norte", Ventas: 10500, Unidades: 42, Categoría: "Electrónica" },
              { Fecha: "2023-01-01", Región: "Sur", Ventas: 8200, Unidades: 36, Categoría: "Hogar" },
              { Fecha: "2023-01-02", Región: "Este", Ventas: 9300, Unidades: 39, Categoría: "Electrónica" },
              { Fecha: "2023-01-02", Región: "Oeste", Ventas: 7150, Unidades: 27, Categoría: "Ropa" },
              { Fecha: "2023-01-03", Región: "Norte", Ventas: 12050, Unidades: 51, Categoría: "Hogar" },
              { Fecha: "2023-01-03", Región: "Sur", Ventas: 9800, Unidades: 43, Categoría: "Electrónica" },
              { Fecha: "2023-01-04", Región: "Este", Ventas: 11200, Unidades: 46, Categoría: "Ropa" },
              { Fecha: "2023-01-04", Región: "Oeste", Ventas: 8900, Unidades: 38, Categoría: "Electrónica" },
            ],
            fileName: file.name,
            fileSize: file.size,
            dateUploaded: new Date().toISOString(),
          };
          
          setIsLoading(false);
          onFileLoaded(mockData);
          
          toast({
            title: "Archivo cargado correctamente",
            description: `${file.name} (${(file.size / 1024).toFixed(2)} KB)`,
          });
        }, 1000);
      }
      setProgress(currentProgress);
    }, 200);
  };

  const resetFile = () => {
    setFile(null);
    setProgress(0);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {!file ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center",
            isDragging ? "border-primary bg-muted/50" : "border-border",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <Upload className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-lg">Arrastra tu archivo aquí</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                Sube un archivo CSV o Excel (.xlsx) para comenzar a analizarlo con nuestra IA
              </p>
            </div>
            <div className="flex gap-4 mt-4">
              <Button 
                onClick={() => inputRef.current?.click()}
                variant="outline"
                className="gap-2"
              >
                <File className="w-4 h-4" />
                Seleccionar archivo
              </Button>
              <Input
                ref={inputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            <div className="text-xs text-muted-foreground mt-4">
              Archivos soportados: CSV, Excel (.xlsx)
            </div>
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-sm truncate max-w-[200px]">
                    {file.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetFile}
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              {isLoading && (
                <div className="w-full mt-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {progress < 100
                      ? "Procesando archivo..."
                      : "Extrayendo datos..."}
                  </p>
                </div>
              )}
            </div>
          </div>
          {!isLoading && (
            <div className="mt-4 flex justify-center">
              <div className="p-4 bg-muted rounded-full">
                <BarChart3 className="w-10 h-10 text-insight-500 animate-pulse-blue" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

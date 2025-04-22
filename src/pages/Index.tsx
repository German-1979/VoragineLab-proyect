
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { ArrowRight, BarChart3, FileText, ChartBarIcon, Search, FileSpreadsheet, MessageSquare, Download } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 px-4 voragine-gradient text-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  Análisis de datos potenciado por IA
                </h1>
                <p className="text-lg md:text-xl opacity-90 max-w-lg">
                  Vorágine Lab te permite analizar tus datos con el poder de
                  la inteligencia artificial. Obtén insights, visualizaciones y
                  análisis en segundos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="bg-white text-voragine-800 hover:bg-white/90">
                    <Link to="/signup">Comenzar gratis</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    <Link to="/login">Iniciar sesión</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="glass-card p-6 md:p-8 rounded-xl">
                  <div className="aspect-video rounded-lg bg-white/10 backdrop-blur flex items-center justify-center">
                    <BarChart3 className="h-20 w-20 text-white/80" />
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-6 bg-white/20 rounded-full w-full max-w-sm"></div>
                    <div className="h-6 bg-white/20 rounded-full w-full max-w-xs"></div>
                    <div className="h-6 bg-white/20 rounded-full w-full max-w-md"></div>
                    <div className="h-6 bg-white/10 rounded-full w-full max-w-lg"></div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 glass-card p-4 rounded-lg hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-insight-500 flex items-center justify-center">
                      <Search className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-white/20 rounded-full w-32"></div>
                      <div className="h-3 bg-white/20 rounded-full w-24"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-10 -left-10 glass-card p-4 rounded-lg hidden md:block">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-insight-500 flex items-center justify-center">
                      <ChartBarIcon className="h-5 w-5 text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-white/20 rounded-full w-40"></div>
                      <div className="h-3 bg-white/20 rounded-full w-28"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Potencia tu análisis de datos
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Vorágine Lab combina herramientas de análisis avanzadas con la potencia
                de los modelos de IA más avanzados.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileSpreadsheet className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Importación sencilla</h3>
                <p className="text-muted-foreground">
                  Carga tus archivos CSV o Excel y comienza a analizar inmediatamente
                  sin configuraciones complejas.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Visualizaciones automáticas</h3>
                <p className="text-muted-foreground">
                  La IA genera automáticamente las visualizaciones más relevantes para
                  tus datos, ahorrándote tiempo y esfuerzo.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Chat con tus datos</h3>
                <p className="text-muted-foreground">
                  Pregunta a la IA sobre tus datos en lenguaje natural y obtén respuestas
                  y análisis instantáneos.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Insights automatizados</h3>
                <p className="text-muted-foreground">
                  Descubre patrones, tendencias y correlaciones que podrían pasar
                  desapercibidos con el análisis manual.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Reportes completos</h3>
                <p className="text-muted-foreground">
                  Genera informes detallados con análisis, visualizaciones y
                  recomendaciones para compartir con tu equipo.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-6 border border-border">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exportación flexible</h3>
                <p className="text-muted-foreground">
                  Exporta tus análisis y visualizaciones en múltiples formatos para
                  presentaciones o documentación.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted">
          <div className="container mx-auto max-w-6xl">
            <div className="bg-gradient-to-br from-voragine-800 to-insight-600 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Comienza a analizar tus datos hoy mismo
                  </h2>
                  <p className="text-lg opacity-90">
                    Regístrate gratis y descubre el poder de la inteligencia artificial
                    aplicada al análisis de datos.
                  </p>
                  <Button asChild size="lg" className="bg-white text-voragine-800 hover:bg-white/90">
                    <Link to="/signup" className="inline-flex items-center">
                      Comenzar ahora
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="relative h-64 md:h-full hidden md:block">
                  <div className="absolute inset-0 rounded-xl glass-card"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BarChart3 className="h-6 w-6 text-insight-500" />
              <span className="font-bold text-xl">Vorágine Lab</span>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-4 justify-center">
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Acerca de
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Características
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Precios
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Blog
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contacto
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vorágine Lab. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

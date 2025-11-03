import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const CountUp = ({ end, duration = 2, delay = 0 }: { end: number; duration?: number; delay?: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      let start = 0;
      const increment = end / (duration * 60);
      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      
      return () => clearInterval(counter);
    }, delay * 1000);
    
    return () => clearTimeout(timer);
  }, [end, duration, delay]);
  
  return <>{count.toLocaleString()}</>;
};

const Index = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');  
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const tours = [
    { id: 1, name: 'Рим', country: 'Италия', region: 'Европа', price: '1 990 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/fee4055e-ff75-43cf-ac9f-c420311a6667.jpg', tours: 12 },
    { id: 2, name: 'Париж', country: 'Франция', region: 'Европа', price: '2 490 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/cfeae994-deb5-4492-8f47-f7a31c8da3e9.jpg', tours: 15 },
    { id: 3, name: 'Токио', country: 'Япония', region: 'Азия', price: '2 790 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/3cce94f2-0526-4234-a855-8190c96eb913.jpg', tours: 10 },
    { id: 4, name: 'Нью-Йорк', country: 'США', region: 'Америка', price: '2 990 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/fee4055e-ff75-43cf-ac9f-c420311a6667.jpg', tours: 18 },
    { id: 5, name: 'Лондон', country: 'Великобритания', region: 'Европа', price: '2 490 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/cfeae994-deb5-4492-8f47-f7a31c8da3e9.jpg', tours: 14 },
    { id: 6, name: 'Дубай', country: 'ОАЭ', region: 'Азия', price: '3 490 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/3cce94f2-0526-4234-a855-8190c96eb913.jpg', tours: 8 },
    { id: 7, name: 'Барселона', country: 'Испания', region: 'Европа', price: '2 190 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/cfeae994-deb5-4492-8f47-f7a31c8da3e9.jpg', tours: 11 },
    { id: 8, name: 'Сингапур', country: 'Сингапур', region: 'Азия', price: '2 890 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/3cce94f2-0526-4234-a855-8190c96eb913.jpg', tours: 9 },
    { id: 9, name: 'Сидней', country: 'Австралия', region: 'Океания', price: '3 190 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/fee4055e-ff75-43cf-ac9f-c420311a6667.jpg', tours: 7 },
    { id: 10, name: 'Амстердам', country: 'Нидерланды', region: 'Европа', price: '2 390 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/cfeae994-deb5-4492-8f47-f7a31c8da3e9.jpg', tours: 13 },
    { id: 11, name: 'Стамбул', country: 'Турция', region: 'Европа', price: '1 790 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/3cce94f2-0526-4234-a855-8190c96eb913.jpg', tours: 14 },
    { id: 12, name: 'Рио-де-Жанейро', country: 'Бразилия', region: 'Америка', price: '2 590 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/fee4055e-ff75-43cf-ac9f-c420311a6667.jpg', tours: 10 },
    { id: 13, name: 'Прага', country: 'Чехия', region: 'Европа', price: '1 890 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/cfeae994-deb5-4492-8f47-f7a31c8da3e9.jpg', tours: 12 },
    { id: 14, name: 'Сеул', country: 'Южная Корея', region: 'Азия', price: '2 690 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/3cce94f2-0526-4234-a855-8190c96eb913.jpg', tours: 11 },
    { id: 15, name: 'Берлин', country: 'Германия', region: 'Европа', price: '2 290 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/fee4055e-ff75-43cf-ac9f-c420311a6667.jpg', tours: 16 },
    { id: 16, name: 'Бангкок', country: 'Таиланд', region: 'Азия', price: '2 190 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/cfeae994-deb5-4492-8f47-f7a31c8da3e9.jpg', tours: 13 },
    { id: 17, name: 'Лос-Анджелес', country: 'США', region: 'Америка', price: '3 090 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/3cce94f2-0526-4234-a855-8190c96eb913.jpg', tours: 15 },
    { id: 18, name: 'Вена', country: 'Австрия', region: 'Европа', price: '2 390 ₽/мес', image: 'https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/fee4055e-ff75-43cf-ac9f-c420311a6667.jpg', tours: 10 }
  ];

  const features = [
    { icon: 'Glasses', title: 'AR технология', description: 'Полное погружение в дополненную реальность с 360° обзором' },
    { icon: 'Users', title: 'Живые гиды', description: 'Общение с местными экспертами в режиме реального времени' },
    { icon: 'Globe', title: 'Весь мир', description: 'Более 150 стран и 1000+ экскурсий в вашем смартфоне' },
    { icon: 'Zap', title: 'Мгновенный доступ', description: 'Начните путешествие прямо сейчас, без ожидания' }
  ];

  const plans = [
    { 
      name: 'Базовый', 
      price: '990 ₽', 
      period: 'месяц',
      features: ['5 туров в месяц', 'HD качество', 'Базовые AR-функции', 'Email поддержка'],
      popular: false
    },
    { 
      name: 'Премиум', 
      price: '1 990 ₽', 
      period: 'месяц',
      features: ['Безлимитные туры', '4K качество', 'Полный AR-функционал', 'Живые гиды 24/7', 'Приоритетная поддержка'],
      popular: true
    },
    { 
      name: 'Семейный', 
      price: '2 990 ₽', 
      period: 'месяц',
      features: ['До 5 аккаунтов', 'Все функции Премиум', 'Детский контент', 'Семейные туры', 'VIP поддержка'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Icon name="Globe" size={24} className="text-white" />
            </div>
            <span className="text-xl font-bold">AR Travel</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#tours" className="text-sm hover:text-primary transition-colors">Туры</a>
            <a href="#features" className="text-sm hover:text-primary transition-colors">Возможности</a>
            <a href="#pricing" className="text-sm hover:text-primary transition-colors">Тарифы</a>
            <a href="#contact" className="text-sm hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button className="gradient-primary">Начать</Button>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-4 gradient-accent text-white border-0">Революция виртуальных путешествий</Badge>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Путешествуй с <span className="gradient-primary bg-clip-text text-transparent">AR</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Погрузитесь в экскурсии по всему миру через дополненную реальность. 
                Общайтесь с местными гидами в реальном времени из любой точки планеты.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Button size="lg" className="gradient-primary text-lg px-8 hover-scale">
                  Попробовать бесплатно
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 hover-scale">
                  <Icon name="Play" size={20} className="mr-2" />
                  Смотреть демо
                </Button>
              </div>
              
              <div ref={statsRef} className="grid grid-cols-3 gap-6">
                {[
                  { value: statsVisible ? 150 : 0, label: 'Стран', icon: 'Globe' },
                  { value: statsVisible ? 1000 : 0, label: 'Экскурсий', icon: 'MapPin' },
                  { value: statsVisible ? 50000 : 0, label: 'Путешественников', icon: 'Users' }
                ].map((stat, i) => (
                  <div key={i} className="text-center p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 hover-scale">
                    <Icon name={stat.icon as any} size={24} className="mx-auto mb-2 text-primary" />
                    <div className="text-3xl font-bold gradient-primary bg-clip-text text-transparent mb-1">
                      {statsVisible && (
                        <CountUp end={stat.value} duration={2} delay={i * 0.2} />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 gradient-accent blur-3xl opacity-20 animate-float"></div>
              <img 
                src="https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/fee4055e-ff75-43cf-ac9f-c420311a6667.jpg" 
                alt="AR Travel Experience" 
                className="rounded-2xl shadow-2xl hover-scale relative z-10"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="tours" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-primary text-white border-0">Популярные направления</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Выберите ваше путешествие</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Более 150 стран и 1000+ экскурсий ждут вас
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder="Поиск по городу или стране..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <Button 
              variant={selectedCountry === null ? "default" : "outline"} 
              onClick={() => setSelectedCountry(null)}
              className={selectedCountry === null ? "gradient-primary" : ""}
            >
              Все
            </Button>
            <Button 
              variant={selectedCountry === 'Европа' ? "default" : "outline"}
              onClick={() => setSelectedCountry('Европа')}
              className={selectedCountry === 'Европа' ? "gradient-primary" : ""}
            >
              Европа
            </Button>
            <Button 
              variant={selectedCountry === 'Азия' ? "default" : "outline"}
              onClick={() => setSelectedCountry('Азия')}
              className={selectedCountry === 'Азия' ? "gradient-primary" : ""}
            >
              Азия
            </Button>
            <Button 
              variant={selectedCountry === 'Америка' ? "default" : "outline"}
              onClick={() => setSelectedCountry('Америка')}
              className={selectedCountry === 'Америка' ? "gradient-primary" : ""}
            >
              Америка
            </Button>
            <Button 
              variant={selectedCountry === 'Океания' ? "default" : "outline"}
              onClick={() => setSelectedCountry('Океания')}
              className={selectedCountry === 'Океания' ? "gradient-primary" : ""}
            >
              Океания
            </Button>
          </div>

          {(() => {
            const filteredTours = tours
              .filter(tour => selectedCountry === null || tour.region === selectedCountry)
              .filter(tour => 
                searchQuery === '' || 
                tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tour.country.toLowerCase().includes(searchQuery.toLowerCase())
              );
            
            return (
              <>
                <div className="text-center mb-8">
                  <p className="text-lg text-muted-foreground">
                    Найдено <span className="font-bold gradient-primary bg-clip-text text-transparent">{filteredTours.length}</span> {filteredTours.length === 1 ? 'направление' : filteredTours.length > 1 && filteredTours.length < 5 ? 'направления' : 'направлений'}
                  </p>
                </div>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTours.map((tour, index) => (
              <Card 
                key={tour.id} 
                className="overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm group relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2" 
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
                  transition: 'all 0.3s ease'
                }}
                onMouseMove={(e) => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;
                  const rotateX = (y - centerY) / 10;
                  const rotateY = (centerX - x) / 10;
                  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
                }}
                onMouseLeave={(e) => {
                  const card = e.currentTarget;
                  card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div className="relative overflow-hidden">
                  <img 
                    src={tour.image} 
                    alt={tour.name} 
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4">
                    <Badge className="gradient-accent text-white border-0 shadow-lg">{tour.tours} туров</Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="text-xs"><Icon name="Star" size={12} className="mr-1" />4.9</Badge>
                      <Badge variant="secondary" className="text-xs"><Icon name="Clock" size={12} className="mr-1" />24/7</Badge>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 relative z-10">
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{tour.name}</h3>
                  <p className="text-muted-foreground mb-4 flex items-center gap-2">
                    <Icon name="MapPin" size={16} />
                    {tour.country}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-semibold gradient-primary bg-clip-text text-transparent">{tour.price}</span>
                    <Button className="gradient-primary group-hover:scale-110 transition-transform">
                      Исследовать
                      <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </section>

      <section id="features" className="py-20 px-4 relative">
        <div className="absolute inset-0 gradient-accent opacity-5"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-accent text-white border-0">AR технологии</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Возможности дополненной реальности</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Передовые технологии для максимального погружения
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 border-border/50 bg-card/50 backdrop-blur-sm group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1" 
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={feature.icon as any} size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 relative z-10 group-hover:text-primary transition-colors">{feature.title}</h3>
                <p className="text-muted-foreground relative z-10">{feature.description}</p>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src="https://cdn.poehali.dev/projects/a5b79293-428a-4992-b2c7-35c0cd8e0fb7/files/cfeae994-deb5-4492-8f47-f7a31c8da3e9.jpg" 
                alt="AR Features" 
                className="rounded-2xl shadow-2xl hover-scale"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-3xl font-bold mb-4">Взаимодействие с местными гидами</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Общайтесь с реальными людьми, живущими в стране вашей мечты. 
                Получайте ответы на вопросы, узнавайте секретные места и культурные особенности.
              </p>
              <ul className="space-y-4">
                {[
                  'Видеосвязь в реальном времени',
                  'Профессиональные лицензированные гиды',
                  'Поддержка 50+ языков',
                  'Персональные маршруты'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center flex-shrink-0">
                      <Icon name="Check" size={16} className="text-white" />
                    </div>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-primary text-white border-0">Выберите план</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Тарифные планы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Первые 7 дней бесплатно для всех тарифов
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`p-8 relative group transition-all duration-300 ${plan.popular ? 'border-primary border-2 scale-105 shadow-2xl shadow-primary/30' : 'border-border/50 hover:border-primary/50'} bg-card/50 backdrop-blur-sm hover:-translate-y-2 hover:shadow-xl`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {plan.popular && (
                  <>
                    <div className="absolute inset-0 gradient-primary opacity-5 rounded-lg"></div>
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="gradient-primary text-white border-0 shadow-lg px-4 py-1">
                        <Icon name="Star" size={14} className="mr-1" />
                        Популярный
                      </Badge>
                    </div>
                  </>
                )}
                <h3 className="text-2xl font-bold mb-2 relative z-10 group-hover:text-primary transition-colors">{plan.name}</h3>
                <div className="mb-6 relative z-10">
                  <span className="text-5xl font-bold gradient-primary bg-clip-text text-transparent">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="space-y-4 mb-8 relative z-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 group/item">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover/item:scale-110 transition-transform">
                        <Icon name="Check" size={14} className="text-primary" />
                      </div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full relative z-10 group-hover:scale-105 transition-transform ${plan.popular ? 'gradient-primary shadow-lg shadow-primary/30' : ''}`} 
                  variant={plan.popular ? "default" : "outline"}
                >
                  Выбрать план
                  <Icon name="ArrowRight" size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 relative">
        <div className="absolute inset-0 gradient-primary opacity-5"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-accent text-white border-0">Связаться с нами</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Остались вопросы?</h2>
            <p className="text-xl text-muted-foreground">
              Наша команда всегда готова помочь вам
            </p>
          </div>

          <Card className="p-8 border-border/50 bg-card/50 backdrop-blur-sm">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Имя</label>
                  <Input placeholder="Ваше имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Тема</label>
                <Input placeholder="Тема обращения" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Сообщение</label>
                <Textarea placeholder="Расскажите подробнее..." rows={5} />
              </div>
              <Button className="w-full gradient-primary text-lg h-12">
                Отправить сообщение
                <Icon name="Send" size={20} className="ml-2" />
              </Button>
            </form>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center border-border/50 bg-card/50 backdrop-blur-sm hover-scale">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon name="Mail" size={24} className="text-white" />
              </div>
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-muted-foreground">support@artravel.com</p>
            </Card>
            <Card className="p-6 text-center border-border/50 bg-card/50 backdrop-blur-sm hover-scale">
              <div className="w-12 h-12 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4">
                <Icon name="Phone" size={24} className="text-white" />
              </div>
              <h4 className="font-semibold mb-1">Телефон</h4>
              <p className="text-muted-foreground">+7 (495) 123-45-67</p>
            </Card>
            <Card className="p-6 text-center border-border/50 bg-card/50 backdrop-blur-sm hover-scale">
              <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <Icon name="MessageCircle" size={24} className="text-white" />
              </div>
              <h4 className="font-semibold mb-1">Чат</h4>
              <p className="text-muted-foreground">24/7 онлайн-поддержка</p>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
                  <Icon name="Globe" size={24} className="text-white" />
                </div>
                <span className="text-xl font-bold">AR Travel</span>
              </div>
              <p className="text-muted-foreground">Путешествуйте по миру с дополненной реальностью</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Туры</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Возможности</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Тарифы</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button size="icon" variant="outline" className="hover-scale">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p>&copy; 2024 AR Travel. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
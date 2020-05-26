### Laravel ve Ionic kullanarak yapılan todo projesi

##### Repoyu indirikten sonra  api klasörüne giriş yapın.



API çalıştırmadan önce gereken sistem gereksinimlerini https://laravel.com/docs/7.x adresi üzerinden kontrol ediniz.

Daha sonra sırasıyla

**composer update**

**cp .env.example .env**

**.env** dosyasına girip  db ayarlarını yapıyoruz
 

Veri tabanı ayarlarını yaptıktan sonra **php artisan migrate** yaparak tablolarımızı oluşturuyoruz.

Yukardaki işlemleri tamamladıktan sonra **php artisan serve** diyerek projeyi ayağa kaldırıyoruz.


##### API Servisi ayağa kaldırdıktan sonra 

ionic klasörüne girip ardından

**npm install**

**ng serve** komutları mobil uygulamayı ayağa kaldırın.

##### API url adresini değiştirme

ionic klasöründe src/app/todo.service.ts dosyasına girip  **url**  adresinden api servisinize ait url adresinizi değiştirebilirsiniz.


 

#### Konu ile ilgili makaleler

**[Laravel + Ionic Todo Çalışması Part #1](https://medium.com/@mehmetkucuk/laravel-ionic-todo-%C3%A7al%C4%B1%C5%9Fmas%C4%B1-part-1-2079cbe60cbf)**

**[Laravel + Ionic Todo Çalışması Part #2](https://medium.com/@mehmetkucuk/laravel-ionic-todo-%C3%A7al%C4%B1%C5%9Fmas%C4%B1-part-2-f63c49c363e8)**

adreslerinden konu ile ilgili makalelere ulaşabilirsiniz.


Konu ile ilgili sorularınızı **info@mehmetkucuk.me** mail adresinden iletebilirsiniz.

Herkese iyi günler.
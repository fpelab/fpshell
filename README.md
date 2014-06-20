Front End Gulp Boilerplate

Gulp сборка для быстрого старта фронт енда с gulp.
Данная сборка умеет работать с изображениями на windows 7 x64 за счет GRUNT

Структура каталога

+ app - каталог продакшена, сюда все компилируется и тут будет наш финальный сайт
+ src - каталог с фаилами для разработки
+   - js - фаилы javascript
+  	   - src - сюда кладем фаилы всех подключаемых плагинов
+      - app.js - тут пишем основной код js
+  - scss - фаилы стилей
+ START DEV.bat - стартуем разработку, если первый запуск, то устанавливаем всё необходимое
+ sprite - создаем спрайты из папки app/img/sprite-imgs в фаил app/img/sprite.png и оптимизирует размер всех фаилов из папки app/img/

В сборке следующие модули: 

+ gulp
+ grunt (в сборке используется для работы с изображениями)
+ livereload (автообновление страницы после изменений)
+ sass (sass компилятор)
+ uglify (Превращаем js код в нечитабельную строчку, которая весит меньше;)
+ util
+ minify-css (Уродуем css)
+ clean (Удаление папки node_modules)
+ header (Добавляем сведения о разработчике на все фаилы)
+ concat
+ sprite (создаем спрайты на основе папки)


To Do
==========================
* Fix watch SCSS error handling
* Add gulp-newer to `dist` images, and possibly other areas

Revision History
==========================

February 03, 2014:
* Added caching of images so the deploy feature won't compress the same images multiple times
* Added cleaning of the `dist` folder in case things got deleted at some point
* Made the dev & dist scripts and css compressed file in the same place so no edits to the href/src needs to be done anymore
* Added graceful errors during watch, so SCSS or JS errors no longe break the `watch`
* Updated `gulpfile.js` since gulp.run() is deprecated now
* Added fonts to the `deploy`

February 04, 2014:
* Removed coffee dependency
* Removed some fingerprinted CSS
* Fixed some CSS/HTML references
* Cleaned up the builder and watcher and fixed watcher bugs, namely issue compression w/ SVGs
* Merged pull request from @Contra who added some best practices, thanks! :)
* 

February 25, 2014
* I've been using this more in development and production, so this has been fine tuned a bit
* I added fonts and other misc assets that should be moved from `dev` to `dist` upon deployment
* I removed image caching because there was an issue where it would randomly break all of the images. I'll figure this but out later though.
* Updated npm dependencies accordingly

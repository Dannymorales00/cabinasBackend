-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2024 a las 10:51:02
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cabinas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `habitaciones`
--

CREATE TABLE `habitaciones` (
  `id` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `capacidad` int(11) NOT NULL,
  `estado` varchar(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `porcentajeDescuento` int(11) NOT NULL DEFAULT 0,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `habitaciones`
--

INSERT INTO `habitaciones` (`id`, `numero`, `descripcion`, `capacidad`, `estado`, `precio`, `porcentajeDescuento`, `createdAt`, `updatedAt`) VALUES
(45, 1, 'habitación contigua a la entrada', 2, 'Activo', 1000, 0, '2023-12-02 09:08:23', '2023-12-02 09:08:23'),
(46, 2, 'habitación para 2 persona', 2, 'Activo', 1100, 5, '2023-12-02 09:12:26', '2023-12-02 09:12:26'),
(47, 3, 'habitación en rebaja', 1, 'Activo', 950, 10, '2023-12-02 09:13:39', '2023-12-02 09:13:39'),
(48, 4, 'habitación grande', 3, 'Activo', 1300, 5, '2023-12-02 09:14:52', '2023-12-02 09:14:52'),
(49, 5, 'no disponible', 1, 'Inactivo', 1100, 15, '2023-12-02 09:15:55', '2023-12-02 09:15:55'),
(50, 6, 'habitación en mantenimiento', 2, 'Inactivo', 1000, 0, '2023-12-02 09:16:42', '2023-12-02 09:16:42'),
(51, 7, 'habitación en descuento', 4, 'Activo', 1400, 20, '2023-12-02 09:17:27', '2023-12-02 09:17:27'),
(52, 8, 'remodelación completada', 1, 'Activo', 1250, 5, '2023-12-02 09:19:59', '2023-12-02 09:19:59'),
(53, 9, 'habitación vacía', 2, 'Inactivo', 900, 0, '2023-12-02 09:20:41', '2023-12-02 09:20:55'),
(54, 10, 'mantenimiento próximamente', 1, 'Activo', 1200, 25, '2023-12-02 09:25:34', '2023-12-02 09:25:34'),
(55, 20, 'nueva habitación', 1, 'Activo', 2550, 12, '2023-12-05 07:08:50', '2023-12-05 07:08:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horarios`
--

CREATE TABLE `horarios` (
  `id` int(11) NOT NULL,
  `dia` varchar(25) NOT NULL,
  `horaApertura` time DEFAULT NULL,
  `horaCierre` time DEFAULT NULL,
  `estado` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `horarios`
--

INSERT INTO `horarios` (`id`, `dia`, `horaApertura`, `horaCierre`, `estado`, `createdAt`, `updatedAt`) VALUES
(9, 'Viernes', '10:00:00', '22:00:00', 1, '2023-10-19 20:08:53', NULL),
(10, 'Martes', '00:00:00', '00:00:00', 1, '2023-10-19 20:08:53', '2023-11-24 11:26:51'),
(11, 'Lunes', '00:00:00', '00:00:00', 1, '2023-10-19 20:08:53', '2023-11-24 11:26:51'),
(12, 'Jueves', '10:00:00', '10:00:00', 1, '2023-10-19 20:08:53', '2023-11-24 11:26:51'),
(13, 'Miércoles', '10:00:00', '10:00:00', 1, '2023-10-19 20:08:53', '2023-11-24 11:26:51'),
(14, 'Sábado', '10:00:00', '10:00:00', 0, '2023-10-19 20:08:53', '2023-12-05 07:07:27'),
(15, 'Domingo', '01:00:00', '13:00:00', 0, '2023-10-19 20:08:53', '2023-11-24 11:26:51');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imageneshabitaciones`
--

CREATE TABLE `imageneshabitaciones` (
  `id` int(11) NOT NULL,
  `numeroHabitacion` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imageneshabitaciones`
--

INSERT INTO `imageneshabitaciones` (`id`, `numeroHabitacion`, `url`, `createdAt`, `updatedAt`) VALUES
(54, 1, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508104/rnhdiyuoemdjpgnwkd8a.jpg', '2023-12-02 09:08:23', '2023-12-02 09:08:23'),
(55, 2, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508346/h36xkpp7hipqqhjde1fc.jpg', '2023-12-02 09:12:26', '2023-12-02 09:12:26'),
(56, 2, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508347/jbqnsnbmd1n85r0kxsww.jpg', '2023-12-02 09:12:26', '2023-12-02 09:12:26'),
(57, 3, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508419/wuonmziajkn9x1yn4hvt.jpg', '2023-12-02 09:13:39', '2023-12-02 09:13:39'),
(58, 3, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508419/sxzynx2mkoaxzv6gd5dq.jpg', '2023-12-02 09:13:39', '2023-12-02 09:13:39'),
(59, 4, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508492/ihxrz4uqoebpkt77eufe.jpg', '2023-12-02 09:14:52', '2023-12-02 09:14:52'),
(60, 4, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508493/vdcvu7bcgmpvvwaaob9j.jpg', '2023-12-02 09:14:52', '2023-12-02 09:14:52'),
(61, 5, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508555/nlty2qsonhfjjbbz3dl2.jpg', '2023-12-02 09:15:55', '2023-12-02 09:15:55'),
(62, 5, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508556/fcrwqsrf4l64fqor3auy.jpg', '2023-12-02 09:15:55', '2023-12-02 09:15:55'),
(63, 6, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508602/eb1kxjijghj701fe4bx4.jpg', '2023-12-02 09:16:42', '2023-12-02 09:16:42'),
(64, 6, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508603/zfauhc29xp46tbkjepvt.jpg', '2023-12-02 09:16:42', '2023-12-02 09:16:42'),
(65, 7, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508647/ccyezogp99qfawxvyxc5.jpg', '2023-12-02 09:17:27', '2023-12-02 09:17:27'),
(66, 7, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508648/c1hndmn7k6yudaiccnj2.jpg', '2023-12-02 09:17:27', '2023-12-02 09:17:27'),
(67, 8, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508799/zphxizddqcfex0jesjgl.jpg', '2023-12-02 09:19:59', '2023-12-02 09:19:59'),
(68, 8, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508800/ssxqhpasehhbl6p6nbrs.jpg', '2023-12-02 09:19:59', '2023-12-02 09:19:59'),
(69, 9, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701508842/s7gzothu1motrep8zql1.jpg', '2023-12-02 09:20:41', '2023-12-02 09:20:41'),
(70, 10, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701509135/ofp8optfxdlc41bhqxwa.jpg', '2023-12-02 09:25:34', '2023-12-02 09:25:34'),
(71, 20, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701760129/itxlqxzivvmkyx0tvvk3.jpg', '2023-12-05 07:08:50', '2023-12-05 07:08:50'),
(72, 1, 'https://res.cloudinary.com/cbguanacaste/image/upload/v1701760147/ouzl0o1blglxsfy5pywd.jpg', '2023-12-05 07:09:08', '2023-12-05 07:09:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imageneshomes`
--

CREATE TABLE `imageneshomes` (
  `id` int(11) NOT NULL,
  `codigo` varchar(25) NOT NULL,
  `url` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imageneshomes`
--

INSERT INTO `imageneshomes` (`id`, `codigo`, `url`, `createdAt`, `updatedAt`) VALUES
(1, 'banner', 'http://res.cloudinary.com/cbguanacaste/image/upload/v1701760048/CBGuanacasteApp/w2z6bdw1xbekxjcsoj7v.jpg', '2023-10-20 02:09:26', '2023-12-05 07:07:29');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `informacioncontactos`
--

CREATE TABLE `informacioncontactos` (
  `id` int(11) NOT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `direccion` varchar(255) DEFAULT NULL,
  `telefono1` int(11) DEFAULT NULL,
  `telefono2` int(11) DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL,
  `urlWhatsApp` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `informacioncontactos`
--

INSERT INTO `informacioncontactos` (`id`, `correo`, `createdAt`, `direccion`, `telefono1`, `telefono2`, `updatedAt`, `urlWhatsApp`) VALUES
(1, 'example@example.com', '2024-08-18 00:26:55', '123 Main Street, City, Country', 1234567890, 2147483647, '2024-08-18 00:26:55', 'https://wa.me/1234567890');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservaciones`
--

CREATE TABLE `reservaciones` (
  `id` int(11) NOT NULL,
  `idUsuario` int(11) NOT NULL,
  `idPaypalPago` varchar(60) NOT NULL,
  `numeroHabitacion` int(11) NOT NULL,
  `cantidadHuespedes` int(1) NOT NULL,
  `estadoReserva` varchar(60) NOT NULL,
  `montoReserva` float NOT NULL,
  `montoTotal` float NOT NULL,
  `fechaReservaDesde` datetime NOT NULL,
  `fechaReservaHasta` datetime NOT NULL,
  `metodoPago` varchar(60) NOT NULL,
  `estadoPago` varchar(60) NOT NULL,
  `porcentajeDescuento` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservaciones`
--

INSERT INTO `reservaciones` (`id`, `idUsuario`, `idPaypalPago`, `numeroHabitacion`, `cantidadHuespedes`, `estadoReserva`, `montoReserva`, `montoTotal`, `fechaReservaDesde`, `fechaReservaHasta`, `metodoPago`, `estadoPago`, `porcentajeDescuento`, `createdAt`, `updatedAt`) VALUES
(10, 59, '3C8278191R164894Y', 2, 2, 'Cancelada', 1280, 1280, '2023-11-05 18:12:00', '2023-11-05 19:12:00', 'Paypal', 'Confirmado', 20, '2023-11-06 00:12:54', '2023-11-14 07:26:31'),
(11, 59, '1D526585J0354342R', 20, 2, 'Cancelada', 2422.5, 2422.5, '2023-11-19 22:28:00', '2023-11-19 22:59:00', 'Paypal', 'Confirmado', 5, '2023-11-20 04:34:21', '2023-12-01 01:13:01'),
(12, 59, '2X637175C7273491G', 20, 2, 'Completada', 33022.5, 33022.5, '2023-11-19 23:48:00', '2023-11-20 12:48:00', 'Paypal', 'Confirmado', 5, '2023-11-20 05:49:42', '2023-12-01 10:43:02'),
(13, 59, '74X715927E1891322', 14, 3, 'Completada', 28800, 28800, '2023-11-20 02:11:00', '2023-11-21 02:11:00', 'Paypal', 'Confirmado', 0, '2023-11-20 08:14:04', '2023-12-01 10:43:02'),
(14, 59, '6HR49702T05341937', 20, 2, 'Completada', 61072.5, 61072.5, '2023-11-21 23:18:00', '2023-11-22 23:18:00', 'Paypal', 'Confirmado', 5, '2023-11-22 05:19:38', '2023-12-01 10:43:02'),
(15, 115, '8664995513039572D', 3, 1, 'Completada', 22705, 22705, '2023-12-06 17:59:00', '2023-12-07 17:59:00', 'Paypal', 'Confirmado', 10, '2023-12-05 07:13:35', '2024-08-21 00:14:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `cedula` int(9) NOT NULL,
  `nombre` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `correo` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` int(10) NOT NULL,
  `tipo` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Cliente',
  `estado` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'Activo',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() COMMENT 'fecha automática',
  `updatedAt` timestamp NULL DEFAULT NULL,
  `fechaRecuperacion` datetime DEFAULT NULL,
  `codigoRecuperacion` varchar(25) DEFAULT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `cedula`, `nombre`, `correo`, `telefono`, `tipo`, `estado`, `createdAt`, `updatedAt`, `fechaRecuperacion`, `codigoRecuperacion`, `contrasena`) VALUES
(114, 504150499, 'Danny Morales', 'dannimoralezquiros@gmail.com', 12345678, 'Administrador', 'Activo', '2023-12-02 03:36:06', '2024-08-21 00:14:17', '2024-08-21 00:11:18', 'NULL', '$2b$10$trPRWyg9i4EKFux9X2d3BecBvQD1t5sMQltCEjGijfykQjSxflU6W'),
(115, 504150495, 'Gabriela sanchez', 'gabi@gmail.com', 12345678, 'Cliente', 'Activo', '2023-12-02 03:37:21', '2023-12-05 07:09:33', NULL, NULL, '$2b$10$7D522PHr1kEbANIqpTIqfuQWfOgcm7RwNiP/NPquIrJJk/aC6e8Mi');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `numero` (`numero`);

--
-- Indices de la tabla `horarios`
--
ALTER TABLE `horarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `diaUK` (`dia`);

--
-- Indices de la tabla `imageneshabitaciones`
--
ALTER TABLE `imageneshabitaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `imageneshomes`
--
ALTER TABLE `imageneshomes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `informacioncontactos`
--
ALTER TABLE `informacioncontactos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telefono1` (`telefono1`),
  ADD UNIQUE KEY `telefono2` (`telefono2`);

--
-- Indices de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cedula` (`cedula`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `habitaciones`
--
ALTER TABLE `habitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `horarios`
--
ALTER TABLE `horarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de la tabla `imageneshabitaciones`
--
ALTER TABLE `imageneshabitaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT de la tabla `imageneshomes`
--
ALTER TABLE `imageneshomes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `informacioncontactos`
--
ALTER TABLE `informacioncontactos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reservaciones`
--
ALTER TABLE `reservaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=116;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

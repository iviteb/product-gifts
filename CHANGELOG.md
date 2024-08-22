# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- Switch to `pentruanimalero` vendor

### Added

- Show only highlighted promotions gifts by using `additionalInfo`
- Extra query to get `productHighlights` with `additionalInfo` in order to be able to filter the gifts based on highlight. `product` from `vtex.search-graphql` doesn't return additionalInfo, so we used `products` query because in the `vtex.search-resolver` it uses inteligent search api with does return.

## [0.4.0] - 2022-06-09

### Added

- French, Japanese, Korean and Thai translations.

### Fixed

- Spanish translation.

## [0.3.1] - 2021-06-15

### Added

- Crowdin configuration file.

### Fixed

- I18n En and Es.

## [0.3.0] - 2021-06-15

### Added

- `nameType` prop to `ProductGiftName` component. It allows the user to choose whether to show the skuname or the productname of the gift.

## [0.2.2] - 2021-06-14

### Fixed

- Default value for prop `text` passed to `gift-text` block.

## [0.2.1] - 2020-05-13

### Fixed

- Avoid making query if context has no product.

## [0.2.0] - 2020-03-11

### Added

- `product` query to be performed by the `ProductGifts` component.

### Changed

- `product-gifts` block will always render in the client.

## [0.1.1] - 2020-03-03

### Added

- Added new block to the exported blocks table (documentation)
- Added the `Mandatory` badge in 2 blocks (documentation)

## [0.1.0] - 2020-03-03

### Added

- Intial release.

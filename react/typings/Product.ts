type Maybe<T> = T | null | undefined

interface OrderForm {
  items: Item[]
  shipping?: Shipping
  marketingData: Maybe<OrderFormMarketingData>
  totalizers: Array<{
    id: string
    name: string
    value: number
  }>
  value: number
  messages: OrderFormMessages
}

interface ProductGiftsQueryResponse {
  product: {
    items: ProductGiftsQueryResponseItem[]
  }
}

interface ProductGiftsQueryResponseItem {
  itemId: string
  sellers: ProductGiftsQueryResponseSeller[]
}

interface ProductGiftsQueryResponseSeller {
  commertialOffer: {
    gifts: Gift[]
  }
}

interface OrderFormItemInput {
  id?: number
  index?: number
  quantity?: number
  seller?: string
  uniqueId?: string
  options?: AssemblyOptionInput[]
}

interface AssemblyOptionItem {
  id: string
  quantity: number
  seller: string
  initialQuantity: number
  choiceType: 'SINGLE' | 'TOGGLE' | 'MULTIPLE'
  name: string
  price: number
  children: Record<string, AssemblyOptionItem[]> | null
}

interface BuyButtonContextState {
  clicked: boolean
}

interface ProductContextState {
  selectedItem: Maybe<ProductContextItem>
  product: Maybe<Product>
  selectedQuantity: number
  skuSelector: {
    isVisible: boolean
    areAllVariationsSelected: boolean
  }
  buyButton: BuyButtonContextState
  assemblyOptions: {
    items: Record<string, AssemblyOptionItem[]>
    inputValues: Record<string, InputValues>
    areGroupsValid: Record<string, boolean>
  }
}

type InputValues = Record<string, string>

interface Product {
  cacheId: string
  productName: string
  productId: string
  description: string
  titleTag: string
  metaTagDescription: string
  linkText: string
  productReference: string
  categoryId: string
  categoriesIds: string[]
  categories: string[]
  categoryTree: Array<{
    id: string
    name: string
    href: string
  }>
  brand: string
  brandId: string
  properties: Array<{
    name: string
    values: string
  }>
  specificationGroups: Array<{
    name: string
    specifications: Array<{
      name: string
      values: string[]
    }>
  }>
  items: ProductContextItem[]
  itemMetadata: {
    items: ItemMetadata[]
    priceTable: any[]
  }
}

interface ProductContextItem {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: Array<{
    Key: string
    Value: string
  }>
  measurementUnit: string
  unitMultiplier: number
  images: Array<{
    imageId: string
    imageLabel: string
    imageTag: string
    imageUrl: string
    imageText: string
  }>
  videos: Array<{
    videoUrl: string
  }>
  sellers: Seller[]
  variations: Array<{
    name: string
    values: string[]
  }>
  productClusters: Array<{
    id: string
    name: string
  }>
  clusterHighlights: Array<{
    id: string
    name: string
  }>
}

interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: string
  commertialOffer: {
    discountHighlights: Array<{
      name: string
    }>
    teasers: Array<{
      name: string
    }>
    Price: number
    ListPrice: number
    PriceWithoutDiscount: number
    RewardValue: number
    PriceValidUntil: string
    AvailableQuantity: number
    Tax: number
    CacheVersionUsedToCallCheckout: string
    gifts?: Gift[]
  }
}

interface Gift {
  productName: string
  brand: string
  linkText: string
  description: string
  skuName: string
  images: GiftImage[]
}

interface GiftImage {
  imageUrl: string
  imageLabel: string
  imageText: string
}

interface ItemMetadata {
  items: Array<{
    id: string
    name: string
    imageUrl: string
    seller: string
    assemblyOptions: {
      id: string
      name: string
      required: boolean
      inputValues: InputValue[]
      composition: Composition | null
    }
  }>
  priceTable: Array<{
    type: string
    values: Array<{
      id: string
      assemblyId: string
      price: number | null
    }>
  }>
}

type InputValue = TextInputValue | BooleanInputValue | OptionsInputValue

enum InputValueType {
  'TEXT' = 'TEXT',
  'BOOLEAN' = 'BOOLEAN',
  'OPTIONS' = 'OPTIONS',
}

interface TextInputValue {
  type: InputValueType.TEXT
  defaultValue: ''
  label: string
  maxLength: number
  domain: null
}

interface BooleanInputValue {
  type: InputValueType.BOOLEAN
  defaultValue: boolean
  label: string
  maxLength: null
  domain: null
}

interface OptionsInputValue {
  type: InputValueType.OPTIONS
  defaultValue: string
  label: string
  maxLength: null
  domain: string[]
}

interface Composition {
  minQuantity: number
  maxQuantity: number
  items: Array<{
    id: string
    minQuantity: number
    maxQuantity: number
    priceTable: string
    seller: string
    initialQuantity: number
  }>
}

interface OrderFormMarketingData {
  utmCampaign?: string
  utmMedium?: string
  utmSource?: string
  utmiCampaign?: string
  utmiPart?: string
  utmipage?: string
  marketingTags?: string
  coupon?: string
}

interface Shipping {
  availableAddresses: CheckoutAddress[]
  countries: string[]
  deliveryOptions: DeliveryOption[]
  selectedAddress: CheckoutAddress | null
}

interface CheckoutAddress {
  addressId: string
  addressType: string
  city: string | null
  complement: string | null
  country: string
  geoCoordinates: number[]
  neighborhood: string | null
  number: string | null
  postalCode: string | null
  receiverName: string | null
  reference: string | null
  state: string | null
  street: string | null
}

interface DeliveryOption {
  id: string
  price: number
  estimate: string
  isSelected: boolean
}

interface OrderFormMessages {
  couponMessages: Message[]
  generalMessages: Message[]
}

interface Message {
  code: string
  text: string
  status: string
}

interface AssemblyOptionInput {
  id?: string
  quantity?: number
  assemblyId: string
  seller?: string
  inputValues?: Record<string, string | boolean>
  options?: AssemblyOptionInput[]
}

interface Item {
  additionalInfo: {
    brandName: string
    brandId: string
    offeringInfo: any | null
    offeringType: any | null
    offeringTypeId: any | null
  }
  availability: string
  detailUrl: string
  id: string
  imageUrls?: {
    at1x: string
    at2x: string
    at3x: string
  }
  listPrice: number
  measurementUnit: string
  name: string
  price: number
  productId: string
  quantity: number
  sellingPrice: number
  skuName: string
  skuSpecifications: SKUSpecification[]
  uniqueId: string
}

interface SKUSpecification {
  fieldName: string
  fieldValues: string[]
}

// tslint:disable
// graphql typescript definitions

declare namespace GQL {
interface IGraphQLResponseRoot {
data?: IQuery | IMutation | ISubscription;
errors?: Array<IGraphQLResponseError>;
}

interface IGraphQLResponseError {
/** Required for all errors */
message: string;
locations?: Array<IGraphQLResponseErrorLocation>;
/** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
[propName: string]: any;
}

interface IGraphQLResponseErrorLocation {
line: number;
column: number;
}

interface IQuery {
__typename: "Query";
findItems: Array<IItem> | null;
viewItem: IItem | null;
findMessages: Array<IMessage> | null;
findSellingOffers: Array<IOffer> | null;
findBuyingOffers: Array<IOffer> | null;
findSellingOffersByItemId: Array<IOffer> | null;
findBuyingOffersByItemId: Array<IOffer> | null;
me: IUser | null;
}

interface IViewItemOnQueryArguments {
id: string;
}

interface IFindMessagesOnQueryArguments {
offerId: string;
}

interface IFindSellingOffersByItemIdOnQueryArguments {
itemId: string;
}

interface IFindBuyingOffersByItemIdOnQueryArguments {
itemId: string;
}

interface IItem {
__typename: "Item";
id: string;
createdAt: string;
name: string;
description: string;
category: Category;
condition: Condition;
price: number;
images: Array<string>;
isAd: boolean;
seller: IUser;
}

const enum Category {
APPLIANCES = 'APPLIANCES',
BABY_KID = 'BABY_KID',
CAR_TRUCK = 'CAR_TRUCK',
CELL_PHONES = 'CELL_PHONES',
CLOTHING_SHOES = 'CLOTHING_SHOES',
FURNITURE = 'FURNITURE',
GAMES_TOYS = 'GAMES_TOYS',
GENERAL = 'GENERAL',
SPORTS_OUTDOORS = 'SPORTS_OUTDOORS',
TOOLS = 'TOOLS'
}

const enum Condition {
NEW = 'NEW',
RECONDITIONED = 'RECONDITIONED',
GREAT = 'GREAT',
GOOD = 'GOOD',
POOR = 'POOR'
}

interface IUser {
__typename: "User";
id: string;
name: string;
email: string;
image: string;
location: string | null;
latitude: number | null;
longitude: number | null;
}

interface IMessage {
__typename: "Message";
id: string;
createdAt: string;
text: string;
user: IUser;
}

interface IOffer {
__typename: "Offer";
id: string;
messages: Array<IMessage> | null;
item: IItem;
seller: IUser;
buyer: IUser;
}

interface IMutation {
__typename: "Mutation";
createMessage: boolean;
createOffer: Array<IError> | null;
sendForgotPasswordEmail: boolean | null;
forgotPasswordChange: Array<IError> | null;
signin: Array<IError> | null;
signout: boolean | null;
signup: Array<IError> | null;
}

interface ICreateMessageOnMutationArguments {
text: string;
offerId: string;
}

interface ICreateOfferOnMutationArguments {
input: IOfferInput;
}

interface ISendForgotPasswordEmailOnMutationArguments {
email: string;
}

interface IForgotPasswordChangeOnMutationArguments {
newPassword: string;
key: string;
}

interface ISigninOnMutationArguments {
email: string;
password: string;
}

interface ISignupOnMutationArguments {
input: ISignupInput;
}

interface IOfferInput {
itemId: string;
sellerId: string;
text: string;
}

interface IError {
__typename: "Error";
path: string;
message: string;
}

interface ISignupInput {
email: string;
name: string;
password: string;
location: string;
latitude: number;
longitude: number;
}

interface ISubscription {
__typename: "Subscription";
newMessage: IMessage;
}

interface INewMessageOnSubscriptionArguments {
offerId: string;
}
}

// tslint:enable

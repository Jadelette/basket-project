
/**
 * I can add a book to my basket. The number of items in my basket will increase by 1, and the price of the book will 
 * be added to the balance.
 * 
 * I can remove a book from my basket. The number of items in my basket will decrease by 1, 
 * and the price of the book will be deducted form the balance. 
 * 
 * I can add multiple items to my basket. The number of items will increase according to the amount of books I have
 * added and the price of each book I add will be added to the balance. 
 * 
 * I can remove multiple books from my basket. The number of items in my basket will derease by the amount of books
 * I have removed and the price of each book removed will be deducted form the balance.
 * 
 * If I have more than 10 books in my basket - each additional book I put in will cost 75% of it's original price.
 * 
 * If I remove a discounted book from my basket, my balance will decrease by 75% of the orgiinal price of the book.
 * 
 * If I remove a book that was not discounted from my basket, my balance will decrease by the pric of the book. If there
 * are now 10 or less books in my basket, any previously discounted books will be charged at full price and my balance
 * will be updated accordingly. 
 * 
 */

const basket2 = require('../app/basket2');

let fantasticMrFox = {
    price: 7,
    title: "Fantastic Mr Fox",
    author: "Roald Dahl",
    isbn: "12345678",
    type: "hardback"
};

test('check that balance is updated after adding a book to empty basket', () => {
    //Given
    expect(basket2.subTotal()).toBe(0);

    //When
    basket2.addToBasket(fantasticMrFox, 1);

    //Then
    expect(basket2.subTotal()).toBe(7);
    expect(basket2.getItems()).toBe(1);
}); //end of test 1

test('Check that balance is updated when a book is removed from basket that is not empty', () => {
    //Given
    expect(basket2.subTotal()).toBe(7);

    //When
    basket2.removeFromBasket(fantasticMrFox, 1);

    //Then
    expect(basket2.subTotal()).toBe(0);
    expect(basket2.getItems()).toBe(0);
}); //end of test 2

test('Check balance when multiple books added to empty basket', () => {
    //Given
    expect(basket2.subTotal()).toBe(0);

    //when
    basket2.addToBasket(fantasticMrFox, 2);

    //Then
    expect(basket2.subTotal()).toBe(14);
    expect(basket2.getItems()).toBe(2);

}); //end of test 3

test('Check that balance is updated when multiple books are removed from basket that is not empty', () => {
    //Given
    expect(basket2.subTotal()).toBe(14);

    //When
    basket2.removeFromBasket(fantasticMrFox, 2);

    //Then
    expect(basket2.subTotal()).toBe(0);
    expect(basket2.getItems()).toBe(0);
}); //end of test 4


test('Check that if more than 10 books added a 25% discount is applied to any over 10', () => {
    //Given
    expect(basket2.subTotal()).toBe(0);

    //When 
    basket2.addToBasket(fantasticMrFox, 11);

    //Then
    expect(basket2.subTotal()).toBe(75.25);
    expect(basket2.getItems()).toBe(11);
}); //end of test 5

test('Check that discount recalculated if books added after discount applied', () => {
    //Given
    expect(basket2.subTotal()).toBe(75.25);

    //when
    basket2.addToBasket(fantasticMrFox, 3);

    //Then
    expect(basket2.subTotal()).toBe(91);
    expect(basket2.getItems()).toBe(14);
}); //end of test 6


test('Check that discounted price of book is deducted from balance if discounted book is removed from basket', () => {
    //Given
    expect(basket2.subTotal()).toBe(91);

    //when
    basket2.removeFromBasket(fantasticMrFox,3);

    //Then
    expect(basket2.subTotal()).toBe(75.25);
    expect(basket2.getItems()).toBe(11);
}); //end of test 7

test('check that if discounted and full price items are removed from basket, the balance is updated accordingly', ()=>{
    //Given
    expect(basket2.subTotal()).toBe(75.25);

    //When
    basket2.removeFromBasket(fantasticMrFox,3);

    //Then
    expect(basket2.subTotal()).toBe(56);
    expect(basket2.getItems()).toBe(8);
}); // end of test 8

test('Check that balance is zero if basket reset', () => {
    //Given
    expect(basket2.subTotal()).toBe(56);

    //When
    basket2.emptyBasket();

    //Then
    expect(basket2.subTotal()).toBe(0);
    expect(basket2.getItems()).toBe(0);
}); // end of test 9
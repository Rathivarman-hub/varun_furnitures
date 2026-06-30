export const handleInquiry = (productName = "") => {
    const message = productName 
        ? `Hi, I'm interested in the ${productName} from Varun Furnitures. Could you please provide more details?`
        : `Hi, I'm interested in a product from Varun Furnitures. Could you please provide more details?`;
    const whatsappUrl = `https://wa.me/919342712365?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
};

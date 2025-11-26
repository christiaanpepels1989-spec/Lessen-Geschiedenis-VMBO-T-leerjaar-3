import { GoogleGenAI, ChatSession, GenerativeModel } from "@google/genai";
import { ChatMessage } from "../types";

const SYSTEM_INSTRUCTION = `
Je bent Digi Docent, een vriendelijke en motiverende geschiedenisdocent voor VMBO-T leerlingen (15 jaar).
Je schrijfstijl is direct, duidelijk en op taalniveau B1/2F. 
Je antwoordt altijd kort en bondig. Maximaal 3 zinnen per antwoord, tenzij er expliciet om een uitleg gevraagd wordt, dan maximaal 100 woorden.
Je weet dat leerlingen visueel zijn ingesteld, dus gebruik beeldende taal.
Je onderwerp is de geschiedenis (specifiek de thema's in de lesstof zoals Nederland-Indië en de Eerste Wereldoorlog).
Als een leerling een vraag stelt die buiten dit onderwerp valt, stuur je ze vriendelijk terug naar het onderwerp.
Wees hulpvaardig, maar geef niet zomaar het antwoord op quizvragen; probeer ze de goede richting op te sturen.
`;

let chatSession: ChatSession | null = null;
let model: GenerativeModel | null = null;

const getModel = () => {
    if (!model) {
        const apiKey = process.env.API_KEY;
        if (!apiKey) {
            console.error("API Key not found via process.env.API_KEY");
            throw new Error("API Key configuration error");
        }
        const ai = new GoogleGenAI({ apiKey });
        model = ai.models.getGenerativeModel({
            model: "gemini-2.5-flash",
            config: {
                systemInstruction: SYSTEM_INSTRUCTION,
            }
        });
    }
    return model;
}

export const startChat = async () => {
    try {
        const m = getModel();
        // Create a new chat session
        chatSession = m.startChat({
            history: [],
        });
        return true;
    } catch (error) {
        console.error("Failed to start chat session", error);
        return false;
    }
};

export const sendMessageToTeacher = async (message: string): Promise<string> => {
    if (!chatSession) {
        // Auto-start if not started
        const success = await startChat();
        if(!success) return "Er is een fout opgetreden bij het verbinden met Digi Docent. Controleer je internetverbinding.";
    }

    try {
        if (!chatSession) {
             throw new Error("Chat session initialization failed");
        }
        const result = await chatSession.sendMessage(message);
        return result.response.text();
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Sorry, ik ben even de draad kwijt. Probeer het nog eens?";
    }
};
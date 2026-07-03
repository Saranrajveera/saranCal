import os
import asyncio
import aiohttp
from dotenv import load_dotenv

from piopiy.agent import Agent
from piopiy.voice_agent import VoiceAgent
from piopiy.services.deepgram.stt import DeepgramSTTService
from piopiy.services.groq.llm import GroqLLMService
from piopiy.services.cartesia.tts import CartesiaTTSService

# Load environment variables from parent directory
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

print("AGENT_ID:", os.getenv("AGENT_ID"))
print("AGENT_TOKEN:", os.getenv("AGENT_TOKEN"))
print("DEEPGRAM_API_KEY:", os.getenv("DEEPGRAM_API_KEY"))
print("GROQ_API_KEY:", os.getenv("GROQ_API_KEY"))
print("CARTESIA_API_KEY:", os.getenv("CARTESIA_API_KEY"))


async def create_session(agent_id, call_id, from_number, to_number, metadata=None):

    print(f"Incoming call {call_id} from {from_number} to {to_number}")

    voice_agent = VoiceAgent(
        instructions="""
You are a TeleCMI support voice assistant.
Help users with TeleCMI calling, SIP setup, AI agents,
API integration and troubleshooting.

Keep answers short and clear.
""",
        greeting="Hello, welcome to TeleCMI support. Please tell me your issue."
    )

    async with aiohttp.ClientSession() as session:

        # Speech to Text
        stt = DeepgramSTTService(
            api_key=os.getenv("DEEPGRAM_API_KEY"),
            encoding="linear16",
            sample_rate=8000
        )

        # LLM
        llm = GroqLLMService(
            api_key=os.getenv("GROQ_API_KEY"),
            model="llama-3.3-70b-versatile"
        )

        # Text to Speech (Cartesia)
        tts = CartesiaTTSService(
            api_key=os.getenv("CARTESIA_API_KEY"),
            voice_id="79a125e8-cd45-4c13-8a67-188112f4dd22",
            model="sonic-english",
            sample_rate=8000,        # IMPORTANT for TeleCMI
            format="wav",            # telephony format
            stream=False,            # Use HTTP instead of WebSocket
            aiohttp_session=session
        )
        

        print("Services initialized successfully")

        await voice_agent.Action(
            stt=stt,
            llm=llm,
            tts=tts
        )

        await voice_agent.start()

        print("Voice agent running...")

        try:
            while True:
                await asyncio.sleep(1)
        except asyncio.CancelledError:
            print("Call ended")


async def main():

    agent = Agent(
        agent_id=os.getenv("AGENT_ID"),
        agent_token=os.getenv("AGENT_TOKEN"),
        create_session=create_session,
        debug=True
    )

    print("Agent started. Waiting for calls...")

    await agent.connect()


if __name__ == "__main__":
    asyncio.run(main())
#!/usr/bin/env python3
import os
import asyncio
import aiohttp
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

async def test_cartesia_api():
    """Test if Cartesia API key is valid"""
    api_key = os.getenv("CARTESIA_API_KEY")
    print(f"Testing Cartesia API key: {api_key[:10]}...")
    
    if not api_key or api_key == "YOUR_REAL_CARTESIA_API_KEY_HERE":
        print("❌ No valid Cartesia API key found")
        return False
    
    # Test Cartesia API
    url = "https://api.cartesia.ai/tts/voices"
    headers = {
        "X-API-Key": api_key,
        "Content-Type": "application/json"
    }
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(url, headers=headers) as response:
                if response.status == 200:
                    print("✅ Cartesia API key is valid!")
                    voices = await response.json()
                    print(f"Found {len(voices)} available voices")
                    return True
                elif response.status == 401:
                    print("❌ Cartesia API key is invalid (401)")
                    return False
                else:
                    print(f"❌ Cartesia API error: {response.status}")
                    return False
    except Exception as e:
        print(f"❌ Error testing Cartesia API: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_cartesia_api())

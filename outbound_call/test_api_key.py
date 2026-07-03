#!/usr/bin/env python3
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))

# Check if Cartesia API key is loaded
cartesia_key = os.getenv("CARTESIA_API_KEY")
print(f"CARTESIA_API_KEY: {cartesia_key}")

if cartesia_key and cartesia_key != "YOUR_REAL_CARTESIA_API_KEY_HERE":
    print("✅ Cartesia API key is loaded!")
    print(f"Key starts with: {cartesia_key[:10]}...")
else:
    print("❌ Cartesia API key is not loaded or still placeholder")

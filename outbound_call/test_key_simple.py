#!/usr/bin/env python3
import os

# Read the .env file directly
env_path = os.path.join(os.path.dirname(__file__), '..', '.env')
try:
    with open(env_path, 'r') as f:
        env_content = f.read()
    
    # Extract CARTESIA_API_KEY
    for line in env_content.split('\n'):
        if line.startswith('CARTESIA_API_KEY='):
            key = line.split('=', 1)[1].strip('"')
            print(f"CARTESIA_API_KEY: {key}")
            if key and key != "YOUR_REAL_CARTESIA_API_KEY_HERE":
                print("✅ Cartesia API key is set!")
                print(f"Key starts with: {key[:10]}...")
            else:
                print("❌ Cartesia API key is placeholder")
            break
    else:
        print("❌ CARTESIA_API_KEY not found in .env file")
        
except FileNotFoundError:
    print(f"❌ .env file not found at {env_path}")
except Exception as e:
    print(f"❌ Error reading .env file: {e}")

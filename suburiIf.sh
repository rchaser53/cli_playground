VARIABLE="feature/AS-2342"
if [ "${VARIABLE}" == "image" ] || [[ "${VARIABLE}" =~ feature/.* ]]; then export NODE_ENV=23; fi
npm run nyan

# if [[ "${VARIABLE}" =~ feature/.* ]]; then echo 28; fi
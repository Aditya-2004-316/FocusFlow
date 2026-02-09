// Quick fix script - replace useState call in map
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../frontend/src/LandingPage/LandingPage.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find and replace the problematic map section with the FeatureCard component call
const problematicCode = /\].map\(\(feature, index\) => \{\s+const \[isHovered, setIsHovered\] = React\.useState\(false\);[\s\S]+?\}\)/m;
const replacement = `].map((feature, index) => (
                                <FeatureCard 
                                    key={index} 
                                    feature={feature} 
                                    index={index} 
                                    width={width}
                                    styles={styles}
                                />
                            ))`;

content = content.replace(problematicCode, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed feature cards');

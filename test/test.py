import pandas as pd
df = pd.DataFrame(["Python Gudio 1991","Java Gosling 1990",None, "Pandas Mckinney 2008"],
                  columns=["Language"]
                 )
df["Third Char"] = df["Language"].str.slice(start=2, stop=3)
print(df)
# 全部大写
print(df["Language"].str.upper())
# 全部小写
print(df["Language"].str.lower())

# 求解长度
 
print(df["Language"].str.len())

# 包含
print(df["Language"].str.contains("P"))
# 是否以J开头
print(df["Language"].str.startswith("J"))  
 # 是否以8结束
print(df["Language"].str.endswith("8")) 

print(df["Language"].str.find("a"))
